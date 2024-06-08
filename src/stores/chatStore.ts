import { defineStore } from 'pinia';
import { getInitialState, type GeneralMessage, type PrivateMessage, type RoomMessage, type User, type UserInfo } from './models';
import { ref, computed } from 'vue';
import { useUserStore } from './userStore';
import { getUserInfo, getUsers } from '@/api/user';

export const useChatStore = defineStore('chat', () => {
  const chat = ref(getInitialState());
  let socket: WebSocket | null = null;

  const connectWebSocket = async () => {
    const userStore = useUserStore();
    const token = userStore.token;

    try {
      // 取得使用者資訊
      const result = await getUserInfo();
      const userInfo = result.data as UserInfo;
      chat.value.userInfo = userInfo;
      // 取得所有使用者列表
      const result2 = await getUsers();
      chat.value.users = result2.data as User[];
    } catch (error) {
      alert('Error fetching');
    }

    const wsUrl = import.meta.env.VITE_WS_BASE_URL
    socket = new WebSocket(`${wsUrl}?token=${token}`);

    socket.onopen = () => console.log('Connected to server');
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log('=>>> Received message：', message);
      switch (message.event) {
        case 'initializationComplete': // 是第一次連線成功後的回應(接收完相關初始化資料)
          console.log('Initialization complete, ChatStore：', chat.value);
          break;
        case 'onlineUsers':
          chat.value.users = chat.value.users.map(user => {
            const isOnline = message.data.users.find((id: string) => id === user.username);
            return {
              ...user,
              status: isOnline ? 'online' : 'offline',
            }
          });
          chat.value.isSocketStable = true;;
          break;
        case 'messageHistory':
          if (message.data.room === 'general') {
            chat.value.generalMessages = message.data.messages;

          } else {
            chat.value.privateMessages = [...chat.value.privateMessages, ...message.data.messages]
          }
          break;
        case 'message':
          chat.value.generalMessages = [...chat.value.generalMessages, message.data];
          break;
        case 'privateMessage':
          chat.value.privateMessages = [...chat.value.privateMessages, message.data];
          break;
        case 'unreadMessages':
          chat.value.unreadCounts = {
            ...chat.value.unreadCounts,
            [message.data.room]: message.data.count,
          };
          break;
        case 'updateUserList':
          useChatStore().disableAutoScroll();
          chat.value.users = message.data;
          useChatStore().enableAutoScroll();
          break;
        case 'messageRecalled':
          chat.value = {
            ...chat.value,
            generalMessages: chat.value.generalMessages.map(msg => {
              if (msg.id === message.data.id) {
                return {
                  ...message.data
                };
              }
              return msg;
            }),
            privateMessages: chat.value.privateMessages.map(msg => {
              if (msg.id === message.data.id && msg.room === message.data.room) {
                return {
                  ...message.data
                };
              }
              return msg;
            }),
          }
          useChatStore().enableAutoScroll();
          break;
        case 'messageUndoRecalled':
          chat.value = {
            ...chat.value,
            generalMessages: chat.value.generalMessages.map(msg => {
              if (msg.id === message.data.id) {
                return {
                  ...message.data
                };
              }
              return msg;
            }),
            privateMessages: chat.value.privateMessages.map(msg => {
              if (msg.id === message.data.id && msg.room === message.data.room) {
                return {
                  ...message.data
                };
              }
              return msg;
            }),
          };
          useChatStore().enableAutoScroll();
        break;
        case 'privateMessageRead':
          useChatStore().disableAutoScroll();
          chat.value = {
            ...chat.value,
            privateMessages: chat.value.privateMessages.map(msg => {
              if (msg.room === message.data.room) {
                return {
                  ...msg,
                  isRead: true,
                };
              }
              return msg;
            }),
          };
          useChatStore().enableAutoScroll();
          break;
        case 'messagesReadByUpdated':
          useChatStore().disableAutoScroll();
          chat.value = {
            ...chat.value,
            generalMessages: chat.value.generalMessages.map(msg => {
              const findUpdated = message.data.find((data: { id: string }) => data.id === msg.id);
              if (findUpdated) {
                return {
                  ...msg,
                  readBy: findUpdated.readBy,
                };
              }
              return msg;
            }),
          };
          useChatStore().enableAutoScroll();
          break;
        default:
          break
      }
    };

    socket.onclose = (event) => {
      console.log('Disconnected from server', event);
    };

    socket.onerror = (error) => {
      console.log('WebSocket error', error);
    };

    return socket;
  };

  const disconnectWebSocket = () => {
    if (socket) {
      socket.close();
      socket = null;
    }
  };

  const onlineUsers = computed(() => chat.value.users.filter(user => user.status === 'online'));
  const offlineUsers = computed(() => chat.value.users.filter(user => user.status === 'offline'));
  const currentChatPartner = computed(() => {
    const currentRoom = chat.value.currentRoom;
    const users = chat.value.users;
    const userInfo = chat.value.userInfo;
    if (currentRoom.startsWith('private_')) {
      // private_{{sender}}_{{to}}
      // 登入者為 user01，與 user02 的聊天室名稱為 private_user01_user02 
      // 左側訊息通知: private_user02_user01，右側聊天室名稱: private_user01_user02，所以會需要判斷 sender 與 to
      const sender = currentRoom.split('_')[1];
      const to = currentRoom.split('_')[2];
      const partnerusername = sender === userInfo?.username ? to : sender;
      const user = users.find(user => user.username === partnerusername);
      return user;
    }else if(currentRoom === 'general'){
      return { username: 'general', status: 'online' };
    }
    return null;
  });

  const messageNotifications = computed(() => {

    const generalUnreadCount = chat.value.unreadCounts['general'] || 0;
    const generalLastMessage = chat.value.generalMessages.filter(msg => !msg.isRecalled).slice(-1)[0];
    let  privateUnreadCounts = chat.value.users.map(user => {
      const username = user.username;
      const status = user.status;
      const room = `private_${username}_${chat.value.userInfo?.username}`; // 收訊者為登入者的聊天室名稱
      let unreadCount = chat.value.unreadCounts[room] || 0;
      let lastMessage: PrivateMessage = chat.value.privateMessages.filter(msg => msg.room === room && !msg.isRecalled ).slice(-1)[0];
      return {
        username,
        room,
        status,
        unreadCount,
        lastMessage,
      };
    });

    privateUnreadCounts = privateUnreadCounts.sort((a, b) => {
      if (!a.lastMessage) return 1;
      if (!b.lastMessage) return -1;
      return new Date(b.lastMessage.date).getTime() - new Date(a.lastMessage.date).getTime();
    });

    return {
      general: {
        room: 'general',
        unreadCount: generalUnreadCount,
        lastMessage: generalLastMessage || { message: '', date: '' }
      },
      private: privateUnreadCounts,
    };

  });

  const allUnreadCount = computed(() => {
    const users = chat.value.users;
    const userInfo = chat.value.userInfo;
    const unreadCounts = chat.value.unreadCounts;

    const generalUnreadCount = unreadCounts['general'] || 0;
    const privateUnreadCount = users.reduce((acc, user) => {
      const room = `private_${user.username}_${userInfo?.username}`;
      const count = unreadCounts[room] || 0;
      return acc + count;
    }, 0);
    return generalUnreadCount + privateUnreadCount;
  });
  
  const currentChatMessages = computed<RoomMessage[]>(() => {
    const currentRoom = chat.value.currentRoom;
    if (currentRoom === 'general') {
      let generalMessages = chat.value.generalMessages || [];
      generalMessages = generalMessages.map(msg => {
        if (msg.replyToMessageId) {
          const replyToMessage = generalMessages.find(m => m.id === msg.replyToMessageId) as GeneralMessage;
          return {
            ...msg,
            replyToMessage,
          };
        }
        return msg;
      });
      return generalMessages as RoomMessage[];
    } else {
      let privateMessage = [...chat.value.privateMessages.filter(msg => ( msg.room === currentRoom))] || [];
      privateMessage = privateMessage.map(msg => {
        if (msg.replyToMessageId) {
          const replyToMessage = privateMessage.find(m => m.id === msg.replyToMessageId) as PrivateMessage;
          return {
            ...msg,
            replyToMessage,
          };
        }
        return msg;
      });
      return privateMessage as RoomMessage[];
    }
  });

  const setCurrentRoom = (room: string) => {
    chat.value.currentRoom = room;
  }

  const sendGeneralMessage = (message: string, replyToMessageId?:string) => {
    if (!socket) {return}
      socket.send(JSON.stringify({
        "event": "message",
        "data": {
            "room": "general",
            "message": message,
            "sender": chat.value.userInfo?.username,
            "replyToMessageId": replyToMessageId
        }
    }));
  }

  const sendPrivateMessage = (message: string, replyToMessageId?:string) => {
    if (!socket) {return}
      socket.send(JSON.stringify({
        "event": "privateMessage",
        "data": {
            "to": currentChatPartner.value?.username,
            "message": message,
            "sender": chat.value.userInfo?.username,
            "replyToMessageId": replyToMessageId
        }
    }));
  }

  const markAsRead = (room: string, type: 'general' | 'private') => {
    if (!socket) {return}
    socket.send(JSON.stringify({
        "event": "markAsRead",
        "data": {
            "room": room,
            "type": type,
            "reader": chat.value.userInfo?.username,
        }
    }));
  }

  const markGeneralAsRead = () => {
    markAsRead('general', 'general');
  }

  const markPrivateAsRead = (room:string) => {
    markAsRead(room, 'private');
  }

  const recallMessage = (room: string, id: any) =>{
    if (!socket) {return}
      socket.send(JSON.stringify({
        "event": "recallMessage",
        "data": {
            "room": room,
            "id": id
        }
    }));
    useChatStore().disableAutoScroll();
  };

  const undoRecallMessage = (room: string, id: any) =>{
    if (!socket) {return}
      socket.send(JSON.stringify({
        "event": "undoRecallMessage",
        "data": {
            "room": room,
            "id": id
        }
    }));
    useChatStore().disableAutoScroll();
  };

  const reset = () => {
    chat.value = getInitialState();
  }

  const methodList = {
    connectWebSocket,
    disconnectWebSocket,
    setCurrentRoom,
    recallMessage,
    undoRecallMessage,
    sendGeneralMessage,
    sendPrivateMessage,
    markGeneralAsRead,
    markPrivateAsRead,
    reset,
  }

  const computedList = {
    onlineUsers,
    offlineUsers,
    currentChatPartner,
    messageNotifications,
    allUnreadCount,
    currentChatMessages,
  }
  
  return {
    chat,
    ...methodList,
    ...computedList,
  };

},{
  usePageVisibility: true,
  useAutoScroll: true
});
