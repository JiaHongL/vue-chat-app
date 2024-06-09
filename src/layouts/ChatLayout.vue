<script setup lang="ts">
import { useChatStore } from '@/stores/chatStore';
import { useViewStore } from '@/stores/viewStore';
import { storeToRefs } from 'pinia';

const chatStore = useChatStore();
const { chat } = storeToRefs(chatStore);

const viewStore = useViewStore();
const { currentView , isMobile} = storeToRefs(viewStore);

const swipeRightHandler = () => {
  if(!isMobile.value){return;}
  viewStore.goToChatList();
}

const swipeLeftHandler = () => {
  if(!isMobile.value){return;}
  viewStore.goToFriendList();
}
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
          <slot name="conversationList" />
          <!-- 中間 對話視窗 -->
          <slot name="chatWindow" usageContext="desktop" />
          <!-- 右側 好友列表 -->
          <slot name="userStatusList" />
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
          <div 
            v-show="currentView === 'friendListView'"
            v-touch:swipe.right="swipeRightHandler"
          >
            <slot name="userStatusList" />
            <slot name="bottomNavigation" />
          </div>

          <!-- 通知訊息頁 -->
          <div 
            v-show="currentView === 'chatListView'"
            v-touch:swipe.left="swipeLeftHandler"
          >
            <slot  name="conversationList" />
            <slot name="bottomNavigation" />
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
            <slot name="chatWindow" usageContext="mobile" />
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
