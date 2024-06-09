<script setup lang="ts">
import { useChatStore } from '@/stores/chatStore';
import { useViewStore } from '@/stores/viewStore';
import { storeToRefs } from 'pinia';
import { useTitle } from '@vueuse/core'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { Subject, interval, map, startWith, takeUntil, tap } from 'rxjs';

const chatStore = useChatStore();
const { chat , allUnreadCount} = storeToRefs(chatStore);
const cleanupPageVisibility = chatStore.setupPageVisibility();
chatStore.connectWebSocket();

const viewStore = useViewStore();
const { currentView , isRealMobile, isMobile} = storeToRefs(viewStore);

const title = useTitle();
const destroy$ = new Subject<void>();
const closeAllUnreadCountWatch = watch(()=> allUnreadCount.value, (newAllUnreadCount) => {
  if (isRealMobile.value) { return; }
  destroy$.next();
  if (newAllUnreadCount > 0) {
    interval(700).pipe(
      startWith(0),
      map(() => title.value),
      tap(currentTitle => {
        if (currentTitle?.includes('New messages')) {
          title.value = `VueChatApp`;
        } else {
          title.value = `🔔 New messages ( ${newAllUnreadCount} )`;
        }
      }),
      takeUntil(destroy$)
    ).subscribe();
  }else{
    title.value = 'VueChatApp';
  }
});

const swipeRightHandler = () => {
  if(!isMobile.value){return;}
  viewStore.goToChatList();
}

const swipeLeftHandler = () => {
  if(!isMobile.value){return;}
  viewStore.goToFriendList();
}

onUnmounted(() => {
  destroy$.next();
  destroy$.complete();
  closeAllUnreadCountWatch();
  cleanupPageVisibility();
})

</script>

<template>
  <!-- desktop -->
  <div class="hidden sm:block">
    <div
      :class="{
        'animate-pulse': !chat.isSocketStable,
      }"
      class="font-sans bg-gray-200 h-screen min-w-[700px]  flex items-center justify-center"
    >
      <div class="flex w-[80%] h-[85%] min-w-[700px] bg-white rounded-lg shadow-lg">
          <!-- 左側 訊息通知 -->
          <ConversationList />
          <!-- 中間 對話視窗 -->
          <ChatWindow usageContext="desktop" />
          <!-- 右側 好友列表 -->
          <UserStatusList />
      </div>
    </div>
  </div>
  <!-- mobile -->
  <div class="block sm:hidden">
    <div 
      class="font-sans bg-gray-200 h-100 w-screen"
    >
      <div class="flex flex-col w-screen bg-white rounded-lg shadow-lg">
        <div class="w-screen margin-2">
          <!-- 好友頁 -->
          <div v-show="currentView === 'friendListView'">
            <UserStatusList v-touch:swipe.right="swipeRightHandler" />
            <BottomNavigation />
          </div>

          <!-- 通知訊息頁 -->
          <div v-show="currentView === 'chatListView'">
            <ConversationList v-touch:swipe.left="swipeLeftHandler" />
            <BottomNavigation />
          </div>

          <!-- 對話頁面 -->
          <div 
            class="
              fixed top-0 w-full h-full bg-white
              transition-transform duration-300 ease-linear translate-x-full 
            "
            :class="{ 
              'open': currentView === 'chatWindowView', 
              'close': currentView !== 'chatWindowView' 
            }" >
            <ChatWindow usageContext="mobile" />
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.open{
  transform: translateX(0);
}
.close{
  transform: translateX(100%);
}
</style>
