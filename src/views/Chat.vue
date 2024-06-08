<script setup lang="ts">
import { useChatStore } from '@/stores/chatStore';
import { useViewStore } from '@/stores/viewStore';
import { storeToRefs } from 'pinia';


const chatStore = useChatStore();
const { chat } = storeToRefs(chatStore);

const viewStore = useViewStore();
const { currentView } = storeToRefs(viewStore);

chatStore.connectWebSocket();

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
            <div v-show="currentView==='friendListView'">
                <UserStatusList />
                <BottomNavigation />
            </div>
            <!-- 通知訊息頁 -->
            <div v-show="currentView==='chatListView'">
                <ConversationList />
                <BottomNavigation />
            </div>
            <!-- 對話頁面 -->
            <div v-show="currentView==='chatWindowView'">
              <ChatWindow usageContext="mobile" />
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>