<script setup lang="ts">
import { ref } from 'vue';
import { useFileDialog } from '@vueuse/core';
import { useChatStore } from '@/stores/chatStore';
import { storeToRefs } from 'pinia';
import useDialog from '@/composables/useDialog';
import ImagePreviewDialog from '@/components/chat/chat-window/ImagePreviewDialog.vue';

const base64String = ref<string>('');
const chatStore = useChatStore();
const { chat, currentChatPartner } = storeToRefs(chatStore);
const { openDialog } = useDialog();

const { files, open, reset, onChange } = useFileDialog({
  accept: 'image/jpeg,image/png,image/gif,image/bmp,image/svg+xml,image/webp',
  directory: false,
});

onChange((files) => {
  if (files && files.length > 0) {
    const reader = new FileReader();
    const selectedFile = files[0];
    reader.onloadend = () => {
      base64String.value = reader.result as string;
      openImagePreviewDialog();
    };
    reader.readAsDataURL(selectedFile);
  }
})

const openImagePreviewDialog = () => {
  openDialog(ImagePreviewDialog, {
    data: {
      isSendButtonVisible: true,  
      base64String: base64String.value,
    },
  }).onClose.then((base64String: string) => {
    if (base64String) {
      const room = chat.value.currentRoom;
      room === 'general' ? chatStore.sendGeneralMessage(base64String): chatStore.sendPrivateMessage(base64String);
    }
    reset();
  });
} 

</script>

<template>
  <div>
    <button
      :disabled="!currentChatPartner?.username"
      type="button"
      @click="open()"
      class="flex items-center justify-center w-10 h-10 ml-2 text-gray-700 bg-white border border-gray-300 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
      </svg>
    </button>
  </div>
</template>

<style scoped>

</style>