<script setup lang="ts">
import { useChatStore } from '@/stores/chatStore';
import UserStatusList from '@/components/UserStatusList.vue';


const chatStore = useChatStore();

chatStore.connectWebSocket();

</script>

<template>
  <div class="hidden sm:block">
    <!-- [ngClass]="{'animate-pulse': !store.isSocketStable()}" -->
    <div 
      class="font-sans bg-gray-200 h-screen min-w-[700px]  flex items-center justify-center"
    >
      <div class="flex w-[80%] h-[85%] min-w-[700px] bg-white rounded-lg shadow-lg">
          <!-- Sidebar -->
          <!-- <app-conversation-list /> -->
          <!-- Chat area -->
          <!-- <app-chat-window usageContext="desktop" /> -->
          <!-- Online/Offline users list -->
          <UserStatusList />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>