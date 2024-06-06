<script setup lang="ts">
import { computed } from 'vue';
import { truncate } from '@/utils';

const props = defineProps({
  sender: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const truncateMessage = computed(() => {
  return truncate(props.message,45)
});
</script>

<template>
  <div class="flex flex-col">
    <div class="text-black">{{ sender }}</div>
    <div class="text-sm text-gray-400 pr-2">{{ truncateMessage }}
    </div>
  </div>
</template>

<style scoped>

</style>