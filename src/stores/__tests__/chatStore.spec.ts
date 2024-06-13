import { createApp } from 'vue'
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { PageVisibilityPlugin } from '../plugins/pageVisibilityPlugin'
import { AutoScrollPlugin } from '../plugins/autoAutoScrollPlugin'
import { useChatStore } from '../chatStore'
import { getInitialState } from '../models'
import * as userApi from '@/api/user'
import type { AxiosResponse } from 'axios'
import * as userStore from '@/stores/userStore'
import { connectionTestData, apiTestData, webSocketOpenTestData, recallMessageTestData, undoRecallMessageTestData , enterChatRoomTestData, newMessagesTestData,setCurrentRoomTestData, sendGeneralMessageTestData, sendPrivateMessageTestData, sendMarkGeneralAsReadTestData, sendMarkPrivateAsReadTestData, sendRecallMessageTestData, sendUndoRecallMessageTestData } from './chatStore.mock-data'

describe('Chat Store', () => {
  const app = createApp({})
  let mockWebSocket: any;
  let chatStore: ReturnType<typeof useChatStore>;

  const sendInitialEvents = () => {
    webSocketOpenTestData.mockEvents.forEach(event => {
      mockWebSocket.onmessage({
        data: JSON.stringify(event)
      })
    })
  }

  const sendRecallMessageEvents = () => {
    recallMessageTestData.mockEvents.forEach(event => {
      mockWebSocket.onmessage({
        data: JSON.stringify(event)
      })
    })
  }

  const sendUndoRecallMessageEvents = () => {
    undoRecallMessageTestData.mockEvents.forEach(event => {
      mockWebSocket.onmessage({
        data: JSON.stringify(event)
      })
    })
  }

  const sendEnterChatRoomEvents = () => {
    enterChatRoomTestData.mockEvents.forEach(event => {
      mockWebSocket.onmessage({
        data: JSON.stringify(event)
      })
    })
  }

  const sendNewMessagesEvents = () => {
    newMessagesTestData.mockEvents.forEach(event => {
      mockWebSocket.onmessage({
        data: JSON.stringify(event)
      })
    })
  }

  const getMockAxiosResponse = (data: any): AxiosResponse => {
    return {
      data,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {} as any
    }
  }

  beforeEach(() => {
    // create a new pinia instance for each test
    const pinia = createPinia()

    // use the plugins
    pinia.use(PageVisibilityPlugin)
    pinia.use(AutoScrollPlugin) 
    app.use(pinia)

    // set the active pinia instance
    setActivePinia(pinia)

    chatStore = useChatStore()

    // mock the environment variables
    vi.stubEnv('VITE_WS_BASE_URL', connectionTestData.mockViteEnv.VITE_WS_BASE_URL)
    
    // mock the user api
    vi.spyOn(userApi, 'getUserInfo').mockResolvedValue(getMockAxiosResponse(apiTestData.mockUserInfo))
    vi.spyOn(userApi, 'getUsers').mockResolvedValue(getMockAxiosResponse(apiTestData.mockUsers))

    // mock the user store
    vi.spyOn(userStore, 'useUserStore').mockReturnValue({
      token: connectionTestData.mockToken
    } as any)

    // mock the WebSocket
    vi.spyOn(global, 'WebSocket').mockImplementation((url: string | URL) => {
      mockWebSocket = {
        url,
        onopen: vi.fn(),
        onclose: vi.fn(),
        onmessage: vi.fn(),
        send: vi.fn(),
        close: vi.fn()
      }
      return mockWebSocket as unknown as WebSocket;
    })
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  it('Initialize the store', () => {
    expect(chatStore.chat).toEqual(getInitialState())
  })

  it('ConnectWebSocket should call getUserInfo and getUsers, and store the results in the store', async () => {
    expect(userApi.getUserInfo).toHaveBeenCalledTimes(0)
    expect(userApi.getUsers).toHaveBeenCalledTimes(0)

    const chatStore = useChatStore()
    await chatStore.connectWebSocket()

    expect(userApi.getUserInfo).toHaveBeenCalledTimes(1)
    expect(userApi.getUsers).toHaveBeenCalledTimes(1)
    expect(chatStore.chat.userInfo).toStrictEqual(apiTestData.expectedStoreUserInfo)
    expect(chatStore.chat.users).toStrictEqual(apiTestData.expectedStoreUsers)
  })

  it('ConnectWebSocket should call WebSocket with the correct URL', async () => {
    await chatStore.connectWebSocket()
    expect(global.WebSocket).toHaveBeenCalledWith(connectionTestData.expectedWebSocketUrl)
  })

  it('After the connection, the related computed properties should calculate correctly', async () => {
    await chatStore.connectWebSocket()
    sendInitialEvents()

    expect(chatStore.chat).toStrictEqual(webSocketOpenTestData.expectedStore)
    expect(chatStore.onlineUsers).toStrictEqual(webSocketOpenTestData.expectedComputed.onlineUsers)
    expect(chatStore.offlineUsers).toStrictEqual(webSocketOpenTestData.expectedComputed.offlineUsers)
    expect(chatStore.currentChatPartner).toStrictEqual(webSocketOpenTestData.expectedComputed.currentChatPartner)
    expect(chatStore.messageNotifications).toStrictEqual(webSocketOpenTestData.expectedComputed.messageNotifications)
    expect(chatStore.allUnreadCount).toStrictEqual(webSocketOpenTestData.expectedComputed.allUnreadCount)
    expect(chatStore.currentChatMessages).toStrictEqual(webSocketOpenTestData.expectedComputed.currentChatMessages)
  })

  it('When a message is recalled, the store and computed properties should be updated', async () => {
    await chatStore.connectWebSocket()
    sendInitialEvents()

    expect(chatStore.chat).toStrictEqual(webSocketOpenTestData.expectedStore)
    expect(chatStore.onlineUsers).toStrictEqual(webSocketOpenTestData.expectedComputed.onlineUsers)
    expect(chatStore.offlineUsers).toStrictEqual(webSocketOpenTestData.expectedComputed.offlineUsers)
    expect(chatStore.currentChatPartner).toStrictEqual(webSocketOpenTestData.expectedComputed.currentChatPartner)
    expect(chatStore.messageNotifications).toStrictEqual(webSocketOpenTestData.expectedComputed.messageNotifications)
    expect(chatStore.allUnreadCount).toStrictEqual(webSocketOpenTestData.expectedComputed.allUnreadCount)
    expect(chatStore.currentChatMessages).toStrictEqual(webSocketOpenTestData.expectedComputed.currentChatMessages)

    sendRecallMessageEvents()

    expect(chatStore.chat).toStrictEqual(recallMessageTestData.expectedStore)
    expect(chatStore.onlineUsers).toStrictEqual(recallMessageTestData.expectedComputed.onlineUsers)
    expect(chatStore.offlineUsers).toStrictEqual(recallMessageTestData.expectedComputed.offlineUsers)
    expect(chatStore.currentChatPartner).toStrictEqual(recallMessageTestData.expectedComputed.currentChatPartner)
    expect(chatStore.messageNotifications).toStrictEqual(recallMessageTestData.expectedComputed.messageNotifications)
    expect(chatStore.allUnreadCount).toStrictEqual(recallMessageTestData.expectedComputed.allUnreadCount)
    expect(chatStore.currentChatMessages).toStrictEqual(recallMessageTestData.expectedComputed.currentChatMessages)
  })

  it('When a message is undo recalled, the store and computed properties should be updated', async () => {
    await chatStore.connectWebSocket()
    sendInitialEvents()

    expect(chatStore.chat).toStrictEqual(webSocketOpenTestData.expectedStore)
    expect(chatStore.onlineUsers).toStrictEqual(webSocketOpenTestData.expectedComputed.onlineUsers)
    expect(chatStore.offlineUsers).toStrictEqual(webSocketOpenTestData.expectedComputed.offlineUsers)
    expect(chatStore.currentChatPartner).toStrictEqual(webSocketOpenTestData.expectedComputed.currentChatPartner)
    expect(chatStore.messageNotifications).toStrictEqual(webSocketOpenTestData.expectedComputed.messageNotifications)
    expect(chatStore.allUnreadCount).toStrictEqual(webSocketOpenTestData.expectedComputed.allUnreadCount)
    expect(chatStore.currentChatMessages).toStrictEqual(webSocketOpenTestData.expectedComputed.currentChatMessages)

    sendRecallMessageEvents()

    expect(chatStore.chat).toStrictEqual(recallMessageTestData.expectedStore)
    expect(chatStore.onlineUsers).toStrictEqual(recallMessageTestData.expectedComputed.onlineUsers)
    expect(chatStore.offlineUsers).toStrictEqual(recallMessageTestData.expectedComputed.offlineUsers)
    expect(chatStore.currentChatPartner).toStrictEqual(recallMessageTestData.expectedComputed.currentChatPartner)
    expect(chatStore.messageNotifications).toStrictEqual(recallMessageTestData.expectedComputed.messageNotifications)
    expect(chatStore.allUnreadCount).toStrictEqual(recallMessageTestData.expectedComputed.allUnreadCount)
    expect(chatStore.currentChatMessages).toStrictEqual(recallMessageTestData.expectedComputed.currentChatMessages)

    sendUndoRecallMessageEvents();

    expect(chatStore.chat).toStrictEqual(undoRecallMessageTestData.expectedStore)
    expect(chatStore.onlineUsers).toStrictEqual(undoRecallMessageTestData.expectedComputed.onlineUsers)
    expect(chatStore.offlineUsers).toStrictEqual(undoRecallMessageTestData.expectedComputed.offlineUsers)
    expect(chatStore.currentChatPartner).toStrictEqual(undoRecallMessageTestData.expectedComputed.currentChatPartner)
    expect(chatStore.messageNotifications).toStrictEqual(undoRecallMessageTestData.expectedComputed.messageNotifications)
    expect(chatStore.allUnreadCount).toStrictEqual(undoRecallMessageTestData.expectedComputed.allUnreadCount)
    expect(chatStore.currentChatMessages).toStrictEqual(undoRecallMessageTestData.expectedComputed.currentChatMessages)
  })

  it('When entering the chat room, the store and computed properties should update', async () => {
    await chatStore.connectWebSocket()
    sendInitialEvents()
    
    expect(chatStore.chat).toStrictEqual(webSocketOpenTestData.expectedStore)
    expect(chatStore.onlineUsers).toStrictEqual(webSocketOpenTestData.expectedComputed.onlineUsers)
    expect(chatStore.offlineUsers).toStrictEqual(webSocketOpenTestData.expectedComputed.offlineUsers)
    expect(chatStore.currentChatPartner).toStrictEqual(webSocketOpenTestData.expectedComputed.currentChatPartner)
    expect(chatStore.messageNotifications).toStrictEqual(webSocketOpenTestData.expectedComputed.messageNotifications)
    expect(chatStore.allUnreadCount).toStrictEqual(webSocketOpenTestData.expectedComputed.allUnreadCount)
    expect(chatStore.currentChatMessages).toStrictEqual(webSocketOpenTestData.expectedComputed.currentChatMessages)

    chatStore.setCurrentRoom(enterChatRoomTestData.params.room)
    sendEnterChatRoomEvents()

    expect(chatStore.chat).toStrictEqual(enterChatRoomTestData.expectedStore)
    expect(chatStore.onlineUsers).toStrictEqual(enterChatRoomTestData.expectedComputed.onlineUsers)
    expect(chatStore.offlineUsers).toStrictEqual(enterChatRoomTestData.expectedComputed.offlineUsers)
    expect(chatStore.currentChatPartner).toStrictEqual(enterChatRoomTestData.expectedComputed.currentChatPartner)
    expect(chatStore.messageNotifications).toStrictEqual(enterChatRoomTestData.expectedComputed.messageNotifications)
    expect(chatStore.allUnreadCount).toStrictEqual(enterChatRoomTestData.expectedComputed.allUnreadCount)
    expect(chatStore.currentChatMessages).toStrictEqual(enterChatRoomTestData.expectedComputed.currentChatMessages)
  })

  it('When multiple new messages are received, the store should be updated', async () => {
    await chatStore.connectWebSocket()
    sendInitialEvents()

    expect(chatStore.chat).toStrictEqual(webSocketOpenTestData.expectedStore)
    expect(chatStore.onlineUsers).toStrictEqual(webSocketOpenTestData.expectedComputed.onlineUsers)
    expect(chatStore.offlineUsers).toStrictEqual(webSocketOpenTestData.expectedComputed.offlineUsers)
    expect(chatStore.currentChatPartner).toStrictEqual(webSocketOpenTestData.expectedComputed.currentChatPartner)
    expect(chatStore.messageNotifications).toStrictEqual(webSocketOpenTestData.expectedComputed.messageNotifications)
    expect(chatStore.allUnreadCount).toStrictEqual(webSocketOpenTestData.expectedComputed.allUnreadCount)
    expect(chatStore.currentChatMessages).toStrictEqual(webSocketOpenTestData.expectedComputed.currentChatMessages)

    sendNewMessagesEvents() 

    expect(chatStore.chat).toStrictEqual(newMessagesTestData.expectedStore)
    expect(chatStore.onlineUsers).toStrictEqual(newMessagesTestData.expectedComputed.onlineUsers)
    expect(chatStore.offlineUsers).toStrictEqual(newMessagesTestData.expectedComputed.offlineUsers)
    expect(chatStore.currentChatPartner).toStrictEqual(newMessagesTestData.expectedComputed.currentChatPartner)
    expect(chatStore.messageNotifications).toStrictEqual(newMessagesTestData.expectedComputed.messageNotifications)
    expect(chatStore.allUnreadCount).toStrictEqual(newMessagesTestData.expectedComputed.allUnreadCount)
    expect(chatStore.currentChatMessages).toStrictEqual(newMessagesTestData.expectedComputed.currentChatMessages)
  })

  it('The setCurrentRoom function should correctly switch the room', async () => {
    const setCurrentRoomSpy = vi.spyOn(chatStore, 'setCurrentRoom')
    
    expect(setCurrentRoomSpy).toHaveBeenCalledTimes(0)

    chatStore.setCurrentRoom(setCurrentRoomTestData.params.room)

    expect(setCurrentRoomSpy).toHaveBeenCalledWith(setCurrentRoomTestData.params.room)
    expect(setCurrentRoomSpy).toHaveBeenCalledTimes(1)
    expect(chatStore.chat.currentRoom).toEqual(setCurrentRoomTestData.expectedStoreCurrentRoom)
  })

  it('The disconnectWebSocket function should close the socket', async () => {
    await chatStore.connectWebSocket()
    expect(mockWebSocket.close).toHaveBeenCalledTimes(0)

    chatStore.disconnectWebSocket()

    expect(mockWebSocket.close).toHaveBeenCalledTimes(1)
  })

  it('The sendGeneralMessage function should correctly send the socket', async () => {
    const sendGeneralMessageSpy = vi.spyOn(chatStore, 'sendGeneralMessage')
    const params = sendGeneralMessageTestData.params;
    await chatStore.connectWebSocket()

    expect(sendGeneralMessageSpy).toHaveBeenCalledTimes(0)
    expect(mockWebSocket.send).toHaveBeenCalledTimes(0)

    chatStore.setCurrentRoom(params.room)
    chatStore.sendGeneralMessage(params.message, params.replyToMessageId)

    expect(sendGeneralMessageSpy).toHaveBeenCalledTimes(1)
    expect(sendGeneralMessageSpy).toHaveBeenCalledWith(params.message, params.replyToMessageId)
    expect(mockWebSocket.send).toHaveBeenCalledTimes(1)
    expect(mockWebSocket.send).toHaveBeenCalledWith(JSON.stringify(sendGeneralMessageTestData.expectedSocketSend))

    chatStore.disconnectWebSocket()
    chatStore.sendGeneralMessage(params.message, params.replyToMessageId)

    expect(sendGeneralMessageSpy).toHaveBeenCalledTimes(2)
    expect(sendGeneralMessageSpy).toHaveBeenCalledWith(params.message, params.replyToMessageId)
    expect(mockWebSocket.send).toHaveBeenCalledTimes(1)
  })

  it('The sendPrivateMessage function should correctly send the socket', async () => {
    const sendPrivateMessageSpy = vi.spyOn(chatStore, 'sendPrivateMessage')
    const params = sendPrivateMessageTestData.params;
    await chatStore.connectWebSocket()

    expect(sendPrivateMessageSpy).toHaveBeenCalledTimes(0)
    expect(mockWebSocket.send).toHaveBeenCalledTimes(0)

    chatStore.setCurrentRoom(params.room)
    chatStore.sendPrivateMessage(params.message, params.replyToMessageId)

    expect(sendPrivateMessageSpy).toHaveBeenCalledTimes(1)
    expect(sendPrivateMessageSpy).toHaveBeenCalledWith(params.message, params.replyToMessageId)
    expect(mockWebSocket.send).toHaveBeenCalledTimes(1)
    expect(mockWebSocket.send).toHaveBeenCalledWith(JSON.stringify(sendPrivateMessageTestData.expectedSocketSend))

    chatStore.disconnectWebSocket()
    chatStore.sendPrivateMessage(params.message, params.replyToMessageId)

    expect(sendPrivateMessageSpy).toHaveBeenCalledTimes(2)
    expect(sendPrivateMessageSpy).toHaveBeenCalledWith(params.message, params.replyToMessageId)
    expect(mockWebSocket.send).toHaveBeenCalledTimes(1)
  })

  it('The markGeneralAsRead function should correctly send the socket', async () => {
    const markGeneralAsReadSpy = vi.spyOn(chatStore, 'markGeneralAsRead')
    await chatStore.connectWebSocket()

    expect(markGeneralAsReadSpy).toHaveBeenCalledTimes(0)
    expect(mockWebSocket.send).toHaveBeenCalledTimes(0)

    chatStore.setCurrentRoom(sendMarkGeneralAsReadTestData.params.room)
    chatStore.markGeneralAsRead()

    expect(markGeneralAsReadSpy).toHaveBeenCalledTimes(1)
    expect(markGeneralAsReadSpy).toHaveBeenCalledWith()
    expect(mockWebSocket.send).toHaveBeenCalledTimes(1)
    expect(mockWebSocket.send).toHaveBeenCalledWith(JSON.stringify(sendMarkGeneralAsReadTestData.expectedSocketSend))
  })

  it('The markPrivateAsRead function should correctly send the socket', async () => {
    const markPrivateAsReadSpy = vi.spyOn(chatStore, 'markPrivateAsRead')
    await chatStore.connectWebSocket()

    expect(markPrivateAsReadSpy).toHaveBeenCalledTimes(0)
    expect(mockWebSocket.send).toHaveBeenCalledTimes(0)

    chatStore.setCurrentRoom(sendMarkPrivateAsReadTestData.params.room)
    chatStore.markPrivateAsRead(sendMarkPrivateAsReadTestData.params.room)

    expect(markPrivateAsReadSpy).toHaveBeenCalledTimes(1)
    expect(markPrivateAsReadSpy).toHaveBeenCalledWith(sendMarkPrivateAsReadTestData.params.room)
    expect(mockWebSocket.send).toHaveBeenCalledTimes(1)
    expect(mockWebSocket.send).toHaveBeenCalledWith(JSON.stringify(sendMarkPrivateAsReadTestData.expectedSocketSend))
  })

  it('The recallMessage function should correctly send the socket', async () => {
    const recallMessageSpy = vi.spyOn(chatStore, 'recallMessage')
    const params = sendRecallMessageTestData.params;
    await chatStore.connectWebSocket()

    expect(recallMessageSpy).toHaveBeenCalledTimes(0)
    expect(mockWebSocket.send).toHaveBeenCalledTimes(0)

    chatStore.setCurrentRoom(params.room)
    chatStore.recallMessage(params.room, params.id)

    expect(recallMessageSpy).toHaveBeenCalledTimes(1)
    expect(recallMessageSpy).toHaveBeenCalledWith(params.room, params.id)
    expect(mockWebSocket.send).toHaveBeenCalledTimes(1)
    expect(mockWebSocket.send).toHaveBeenCalledWith(JSON.stringify(sendRecallMessageTestData.expectedSocketSend))
  })

  it('The undoRecallMessage function should correctly send the socket', async () => {
    const undoRecallMessageSpy = vi.spyOn(chatStore, 'undoRecallMessage')
    const params = sendUndoRecallMessageTestData.params;
    await chatStore.connectWebSocket()

    expect(undoRecallMessageSpy).toHaveBeenCalledTimes(0)
    expect(mockWebSocket.send).toHaveBeenCalledTimes(0)

    chatStore.setCurrentRoom(params.room)
    chatStore.undoRecallMessage(params.room, params.id)

    expect(undoRecallMessageSpy).toHaveBeenCalledTimes(1)
    expect(undoRecallMessageSpy).toHaveBeenCalledWith(params.room, params.id)
    expect(mockWebSocket.send).toHaveBeenCalledTimes(1)
    expect(mockWebSocket.send).toHaveBeenCalledWith(JSON.stringify(sendUndoRecallMessageTestData.expectedSocketSend))
  })

  it('The reset function should reset the store and disconnect the websocket', async () => {
    const resetSpy = vi.spyOn(chatStore, 'reset')
    await chatStore.connectWebSocket()

    expect(resetSpy).toHaveBeenCalledTimes(0)
    expect(mockWebSocket.close).toHaveBeenCalledTimes(0)

    chatStore.reset()

    expect(resetSpy).toHaveBeenCalledTimes(1)
    expect(mockWebSocket.close).toHaveBeenCalledTimes(1)
    expect(chatStore.chat).toEqual(getInitialState())
  })

})