<script setup lang="ts">
import { computed } from 'vue';
import useDialog from '@/composables/useDialog';
import ImagePreviewDialog from '@/components/dialog/ImagePreviewDialog.vue';

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
      class=" bg-gray-200 p-2 rounded-b-lg"
      :class="{
        'rounded-t-lg': !isReplyToMessage
      }"
    >
      <img
        @click="openImagePreview" 
        class="cursor-pointer max-w-[200px] max-h-[200px] rounded-lg" 
        :src="message" 
        alt="Image"
      >
    </div>
  </template>
  <!-- 文字 -->
  <template v-else>
    <div 
      class="w-full bg-gray-200 p-2 rounded-b-lg whitespace-pre-wrap"
      :class="{
        'rounded-t-lg': !isReplyToMessage
      }"  
      v-html="message"
    ></div>
  </template>
</template>

<style scoped>

</style>