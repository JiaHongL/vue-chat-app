<script setup lang="ts">
import { computed } from 'vue';
import useDialog from '@/composables/useDialog';
import ImagePreviewDialog from '@/components/chat/chat-window/ImagePreviewDialog.vue';

const { openDialog } = useDialog();

const props = defineProps({
  isReplyToMessage: {
    type: Boolean,
    required: false,
  },
  message: {
    type: String,
    required: true,
  },
});
const openImagePreview = () => {
  openDialog(ImagePreviewDialog, {
    data: {
      base64String: props.message,
    },
  });
};

const isImage = computed(() => props.message.includes('data:image'));

</script>

<template>
  <!-- 圖片 -->
  <template v-if="isImage">
    <div 
      class="ml-1 bg-blue-500 p-2 rounded-b-lg"
      :class="{'rounded-t-lg': !isReplyToMessage}" 
    >
      <img
        @click="openImagePreview"
        class="cursor-pointer max-w-[200px] max-h-[200px] ml-auto rounded-lg ml-1" 
        :src="message" 
        alt="Image"
      >
    </div>
  </template>
  <!-- 文字 -->
  <template v-else>
    <div 
      class="ml-1 bg-blue-500 text-white rounded-b-lg p-2 whitespace-pre-wrap break-all"
      :class="{'rounded-t-lg': !isReplyToMessage}"
      v-html="message"
    ></div>
  </template>
</template>

<style scoped>

</style>