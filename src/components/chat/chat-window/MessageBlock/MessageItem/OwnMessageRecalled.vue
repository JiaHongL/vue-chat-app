<script setup lang="ts">
const props = defineProps({
  sender: {
    type: String,
    default: '',
    required: true,
  },
  canUndo: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['undoRecallMessage']);
</script>

<template>
  <!-- 具有 undo 功能 -->
  <template v-if="canUndo">
    <div class=" flex justify-end mb-5">
      <div class="bg-gray-100 p-2 rounded-lg">
        <p class="text-sm text-gray-500 italic">Message recalled</p>
        <button
          @click="$emit('undoRecallMessage')"
          class="text-xs text-blue-500 hover:underline" 
        >Undo Recall</button>
      </div>
    </div>
  </template>
  <!-- 純文字顯示 -->
  <template v-else>
    <div class="flex flex-col">
      <div class="text-white  mr-2">{{ sender }}</div>
      <div class="text-sm text-gray-200 italic">Message recalled</div>
    </div>
  </template>
</template>

<style scoped>
</style>