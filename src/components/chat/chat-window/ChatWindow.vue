<script setup lang="ts">
import { ref, readonly, provide } from 'vue';
import { ChatWindowShareStateKey } from './chat-window-share-state-key';
import type { RoomMessage } from '@/stores/models';

const selectedReplyMessage = ref<RoomMessage>();

const shareState = {
  selectedReplyMessage: readonly(selectedReplyMessage),
  updateSelectedReplyMessage: (value:RoomMessage) => {
    selectedReplyMessage.value = value;
  }
};

// 使用 provide 提供共享狀態
provide(ChatWindowShareStateKey, shareState);

</script>

<template>
  <div class="relative pl-0 sm:flex-1 flex flex-col min-w-[250px] sm:h-auto">
    <!-- 頂部 使用者資訊 -->
    <UserStatus />
    <!-- 訊息區塊 -->
    <MessageBlock />
    <!-- 輸入區塊 -->
    <InputBlock />
  </div>
</template>

<style scoped>

</style>