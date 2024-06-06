<script setup lang="ts">
const props = defineProps({
  currentChatPartnerUsername: {
    type: String,
    required: true
  },
  sender: {
    type: String,
    default: ''
  },
  styleType: {
    type: String,
    default: '1'
  }
});
</script>

<template>
  <template v-if="currentChatPartnerUsername === 'general' && styleType==='1'">
    <div class="flex items-center mb-2">
      <Avatar class="w-6 h-6 rounded-full mr-2" :username="sender" />
      <div class="text-sm font-semibold">{{ sender }}</div>
    </div>
  </template>
  <div
    v-if="styleType==='1'"
    class="flex justify-start mb-4"
  >
    <div class="bg-gray-100 p-2 rounded-lg mb-2">
      <p class="text-sm text-gray-500 italic" id="recalledMessageText"> Message recalled</p>
    </div>
  </div>
  <div
      v-else
      class="flex flex-col mr-2"
    >
    <div class=" text-black">{{ sender }}</div>
    <div class="text-sm text-gray-400 italic">Message recalled</div>
  </div>
</template>

<style scoped>
</style>