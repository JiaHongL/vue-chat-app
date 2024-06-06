import { defineStore } from 'pinia';
import { initialState, type User, type UserInfo } from './models';
import { ref, computed } from 'vue';
import { useUserStore } from './userStore';
import { getUserInfo, getUsers } from '@/api/user';

export const useChatStore = defineStore('chat', () => {
  const chat = ref(initialState);
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
      console.log('result2', result2);
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
          // store.disableAutoScroll();
          chat.value.users = message.data;
          // store.enableAutoScroll();
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
          // store.enableAutoScroll();
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
          // store.enableAutoScroll();
        break;
        case 'privateMessageRead':
          // store.disableAutoScroll();
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
          // store.enableAutoScroll();
          break;
        case 'messagesReadByUpdated':
          // store.disableAutoScroll();
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
          // store.enableAutoScroll();
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

  const onlineUsers = computed(() => chat.value.users.filter(user => user.status === 'online'));
  const offlineUsers = computed(() => chat.value.users.filter(user => user.status === 'offline'));


  const setCurrentRoom = (room: string) => {
    chat.value.currentRoom = room;
  }

  const methodList = {
    connectWebSocket,
    setCurrentRoom,
  }

  const computedList = {
    onlineUsers,
    offlineUsers,
  }
  
  return {
    chat,
    ...methodList,
    ...computedList,
  };
});
