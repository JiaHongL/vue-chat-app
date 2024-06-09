<script setup lang="ts">
import { ref, readonly, provide, onUnmounted, watch } from 'vue';
import { ChatWindowShareStateKey } from './chat-window-share-state-key';
import type { RoomMessage } from '@/stores/models';
import { useChatStore } from '@/stores/chatStore';
import { useViewStore } from '@/stores/viewStore';
import { Subject } from 'rxjs';
import { storeToRefs } from 'pinia';
import type { CustomStoreToRefs } from 'pinia-extensions';

const props = defineProps<{
  usageContext: string;
}>();

const selectedReplyMessage = ref<RoomMessage>();
const chatBoxScrollToBottomSubject = new Subject<any>();

const shareState = {
  chatBoxScrollToBottomObs$: chatBoxScrollToBottomSubject.asObservable(),
  selectedReplyMessage: readonly(selectedReplyMessage),
  updateSelectedReplyMessage: (value: RoomMessage) => {
    selectedReplyMessage.value = value;
  }
};

// 使用 provide 提供共享狀態與函式
provide(ChatWindowShareStateKey, shareState);

const chatStore = useChatStore();

const {
  markGeneralAsRead,
  markPrivateAsRead
} = chatStore;

const { 
  currentChatPartner,
  chat,
  isPageVisible,
} = storeToRefs(chatStore) as unknown as CustomStoreToRefs<typeof chatStore>;

const viewStore = useViewStore();

const { 
  currentView,
  isMobile
} = storeToRefs(viewStore);

const stopAutoMarkReadWatch = watch([
  ()=> chat.value.currentRoom, // 監聽當前房間，可能是 private_XXX_YYY 或 private_YYY_XXX，所以需要監聽。
  ()=> currentChatPartner.value?.username, // 監聽當前聊天對象
  ()=> isPageVisible.value, // 監聽當前頁面是否可見
  ()=> currentView.value, // 監聽當前視圖
  ()=> chat.value.unreadCounts // 監聽未讀訊息數量
], ([
  room,
  currentChatPartnerUsername,
  isPageVisible,
  currentView,
  unreadCounts
]) =>  {

    const watchObj = {
      // 需要監聽的屬性
      room: room, 
      currentChatPartnerUsername: currentChatPartnerUsername,
      isPageVisible: isPageVisible,
      currentView: currentView,
      unreadCounts:  unreadCounts,
      // 不需要監聽的屬性
      isMobile: isMobile.value,
      usageContext: props.usageContext,
      userInfo: chat.value.userInfo,
    };

    // 如果當前頁面不可見，就不標記已讀
    if (!watchObj.isPageVisible) {
      return;
    }

    // 如果沒選擇聊天對象，就不標記已讀
    if (!watchObj.currentChatPartnerUsername) {
      return;
    }

    // 如果是手機裝置，且當前視圖不是聊天視圖，就不標記已讀
    if (
      watchObj.isMobile &&
      watchObj.currentView !== 'chatWindowView'
    ) {
      return;
    }

    // 如果是在 general 房間，且有未讀訊息，就標記已讀
    if (
      watchObj.room === 'general' &&
      watchObj.unreadCounts['general'] > 0
    ) {
      markGeneralAsRead();
      return;
    }

    // 已讀私人訊息的房間(別人傳來的訊息)，名稱為 `private_${對方的使用者名稱}_${自己的使用者名稱}`，就是已讀對方傳送的訊息
    const receiveRoom = `private_${watchObj.currentChatPartnerUsername}_${watchObj.userInfo?.username}`;

    // 如果是在私人房間，且有未讀訊息，就標記已讀 (分 desktop 與 mobile 兩種情況)
    if (
      (
        watchObj.isMobile && watchObj.usageContext == 'mobile' &&
        watchObj.unreadCounts[receiveRoom] > 0
      ) ||
      (
        !watchObj.isMobile && watchObj.usageContext == 'desktop' &&
        chat.value.unreadCounts[receiveRoom] > 0
      )
    ) {
      markPrivateAsRead(receiveRoom);
      return;
    }
});

// 監聽新訊息，自動滾動到底部
const closeNewMessageWatch = watch(()=> chatStore.currentChatMessages, (newVal) => {
  const currentChatMessages = newVal;
  if (currentChatMessages.length > 0) {
    chatBoxScrollToBottomSubject.next('');
  }
});

// 監聽聊天對象變更，自動滾動到底部
const stopChatPartnerWatch = watch(()=> currentChatPartner.value?.username, (newVal) => {
  const chatPartnerUsername = newVal;
  if (chatPartnerUsername) {
    chatBoxScrollToBottomSubject.next('');
  }
});

onUnmounted(() => {
  chatBoxScrollToBottomSubject.complete();
  stopChatPartnerWatch();
  closeNewMessageWatch();
  stopAutoMarkReadWatch();
});

</script>

<template>
  <div class="relative pl-0 flex-1 flex flex-col min-w-[250px] sm:h-auto">
    <!-- 頂部 使用者資訊 -->
    <UserStatus />
    <!-- 訊息區塊 -->
    <MessageBlock />
    <!-- 輸入區塊 -->
    <InputBlock />
  </div>
</template>

<style scoped></style>