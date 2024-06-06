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
</template>

<style scoped>

</style>