<script setup lang="ts">
import { computed } from 'vue';
import { formatDate } from '@/utils';

const props = defineProps({
  username: {
    type: String,
    required: true,
  },
  isRead: {
    type: Boolean,
  },
  readBy: {
    type: Array
  },
  date: {
    type: String,
    required: true,
  },
});

const isPrivateMessageRead = computed(() => {
  return props.username !== 'general' && props.isRead;
});

const isPublicMessageRead = computed(() => {
  return props.username === 'general' && props.readBy && props.readBy.length > 1;
});

const formattedDate = computed(() => {
  return formatDate(props.date);
});

</script>
<template>
  <div 
    class="flex flex-col min-w-[40px] justify-end text-right text-xs text-gray-500 mt-1"
  >
    <!-- 私人訊息已讀 -->
    <template v-if="isPrivateMessageRead">
      <span class="text-[10px] fon-size text-green-500">Read</span>
    </template>
    <!-- 公共頻道已讀 -->
    <template v-else-if="isPublicMessageRead">
      <span class="text-[10px] text-green-500">Read {{ (readBy ?? []).length - 1 }}</span>
    </template>
    <div>
      {{ formattedDate }}
    </div>
  </div>
</template>
<style scoped>
</style>