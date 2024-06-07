<script setup lang="ts">
import { useChatStore } from '@/stores/chatStore';
import { storeToRefs } from 'pinia';


const chatStore = useChatStore();
const { chat } = storeToRefs(chatStore);

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
          <!-- Sidebar -->
          <ConversationList />
          <!-- Chat area -->
          <!-- usageContext="desktop" -->
          <ChatWindow />
          <!-- Online/Offline users list -->
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
            <!-- [hidden]="viewService.currentView()!=='friendList'" -->
            <div>
                <UserStatusList />
                <BottomNavigation />
            </div>
            <!-- 通知訊息頁 -->
            <!-- [hidden]="viewService.currentView()!=='chatList'" -->
            <div>
                <ConversationList />
                <BottomNavigation />
            </div>
            <!-- 對話頁面 -->
            <!-- [hidden]="viewService.currentView()!=='chatWindow'" -->
            <div>
              <!-- <app-chat-window usageContext="mobile" /> -->
              <ChatWindow />
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>