<script setup lang="ts">
import { inject, ref } from 'vue';
import { storeToRefs } from 'pinia'
import { ChatWindowShareStateKey } from './chat-window-share-state-key';
import type { ChatWindowShareState } from './chat-window-share-state.model';
import { useChatStore } from '@/stores/chatStore';
import vPasteImage from '@/directives/vPasteImage';
import useDialog from '@/composables/useDialog';
import ImagePreviewDialog from '@/components/dialog/ImagePreviewDialog.vue';
import { useInsertAtCursor } from '@/composables/useInsertAtCursor';
import vCompositionEndEnter from '@/directives/vCompositionEndEnter';

const { saveCursorPosition, insertAtCursor } = useInsertAtCursor();
const textarea = ref<HTMLTextAreaElement | null>(null);

const chatWindowShareState = inject<ChatWindowShareState>(ChatWindowShareStateKey);
const selectedMessage = chatWindowShareState?.selectedReplyMessage;
const updateSelectedReplyMessage = chatWindowShareState?.updateSelectedReplyMessage;
const { openDialog } = useDialog();

const chatStore = useChatStore();
const { sendGeneralMessage,sendPrivateMessage } = chatStore;
const { chat, currentChatPartner } = storeToRefs(chatStore);


const message = ref<string>('');

const sendMessage = (event?: Event) => {
    const room = chat.value.currentRoom;
    const selectedMessageId = selectedMessage?.id || '';

    room === 'general' ? 
    sendGeneralMessage(message.value, selectedMessageId): 
    sendPrivateMessage(message.value, selectedMessageId);

    clearState();
  }

  const clearState = () => {
    message.value = '';
    if (
      selectedMessage &&
      updateSelectedReplyMessage
    ) {
      updateSelectedReplyMessage(null);
    }
  }

  const handlePasteImage = (event:{
    detail:string
  }) => {
    openDialog(
      ImagePreviewDialog, 
      {
        data: {
          isSendButtonVisible: true,  
          base64String: event.detail,
        }
    }).onClose.then((base64String: string) => {
      if (base64String) {
        const room = chat.value.currentRoom;
        room === 'general' ? chatStore.sendGeneralMessage(base64String): chatStore.sendPrivateMessage(base64String);
      }
    });
    
  }

  const selectEmoji = (emoji: string) => {
    message.value = insertAtCursor(emoji, message.value);
  }

</script>

<template>
  <div class="relative p-4 border-t flex-shrink-0">

    <!-- input bar -->
    <div class="flex items-center">
      <textarea
        ref="textarea" 
        v-model="message"
        placeholder="Type Your Message Here" 
        class="flex-grow px-4 py-2 bg-white border border-gray-300 rounded-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
        rows="2" 
        style="line-height: 1.5;"
        :disabled="!currentChatPartner?.username"
        v-composition-end-enter
        @compositionEndEnter="sendMessage"
        @focus="saveCursorPosition"
        @blur="saveCursorPosition"
        v-paste-image 
        @pasteImage="handlePasteImage"
      ></textarea>

      <!-- 送出按鈕 -->
      <button
        :disabled="!currentChatPartner?.username"
        @click="sendMessage"
        class="flex items-center justify-center w-10 h-10 ml-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
        <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>

      <!-- 表情符號選擇器 -->
      <EmojiPickerButton 
        @selectEmoji="selectEmoji"
      />

      <!-- 選擇上傳圖片 -->
      <ImageUploadButton />

    </div>

    <!-- reply message preview -->
    <ReplyPreview 
      :selectedMessage="selectedMessage" 
      :updateSelectedReplyMessage="updateSelectedReplyMessage" 
    />

  </div>
</template>

<style scoped>
</style>