<script setup lang="ts">
const props = defineProps({
  selectedMessage: {
    type: [Object]
  },
  updateSelectedReplyMessage: {
    type: Function,
    required: true,
  },
});
</script>

<template>
    <template v-if="selectedMessage">
      <div class="absolute h-[60px] top-[-60px] left-0 flex bg-slate-50 w-full p-2">
        <div class="flex shrink-0 items-center">
          <Avatar class="w-10 h-10 rounded-full mr-2 bg-white" :username="selectedMessage.sender" />
        </div>
        <div class="flex flex-col justify-center overflow-hidden">
            <!-- 圖片 -->
            <div
              v-if="selectedMessage.message.includes('data:image')"
              class="flex"
            >
              <div class="leading-[60px] mr-2 text-base font-semibold">{{ selectedMessage.sender }}</div>
              <!-- 圖片 -->
              <div class="rounded-lg flex-shrink-0">
                <img
                  class="rounded-lg object-contain h-[44px] w-[44px] mt-2" 
                  :src="selectedMessage?.message" 
                  alt="Image"
                >
              </div>
            </div>
            <!-- 文字 -->
            <div
              v-else
            >
              <div class="text-base font-semibold">{{ selectedMessage.sender }}</div>
              <div class="pr-2 text-gray-500 text-base whitespace-nowrap overflow-hidden overflow-ellipsis">
                {{ selectedMessage.message }}
              </div>
            </div>
        </div>
        <div
          @click="updateSelectedReplyMessage && updateSelectedReplyMessage(null)"
          class="absolute top-[5px] right-[5px] cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </div>
      </div>
    </template>
</template>

<style scoped>

</style>