<script setup lang="ts">
import { useChatStore } from '@/stores/chatStore';
import { useViewStore } from '@/stores/viewStore';
import { storeToRefs } from 'pinia';

const chatStore = useChatStore();
const {
  chat,
  allUnreadCount,
  currentChatPartner
} = storeToRefs(chatStore);

const viewStore = useViewStore();

</script>

<template>
  <div 
    class="flex flex-shrink-0 items-center p-4 border-b overflow-hidden" 
  >
    <div class="flex items-center p-2 bg-white">
        <button 
          class="block sm:hidden text-blue-500 flex items-center"
          @click="viewStore.goBack()"
        >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
        </button>
        <div 
          class="block sm:hidden bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center"
          :class="{ 
            'w-7': allUnreadCount > 99, 
          }" 
          v-if="allUnreadCount > 0"
        >
          {{ allUnreadCount }}
        </div>
    </div>
    <div class="relative h-10">
      <template v-if="currentChatPartner?.username">
        <Avatar :username="currentChatPartner?.username" :isGeneral="currentChatPartner?.username === 'general'"  />
        <template v-if="currentChatPartner?.status === 'online'">
          <span class="absolute bottom-0 right-3 bg-green-400 w-2 h-2 rounded-full"></span>
        </template>
        <template v-else>
          <span class="absolute bottom-0 right-3 bg-gray-500 w-2 h-2 rounded-full"></span>
        </template>
      </template>
    </div>
    <div>
      <div class="flex items-center font-semibold">
        <div class="mr-1 text-xl max-w-[250px] sm:max-w-[350px] text-nowrap overflow-hidden text-ellipsis">
          {{  
            currentChatPartner?.username === 'general' ? 'General' : currentChatPartner?.username
          }}
        </div>
        <template v-if="currentChatPartner?.username === 'general'">
          <span class="text-sm text-gray-500">
            ({{ chat.users.length }})
          </span>
        </template>
      </div>
      <div class="text-gray-500 text-sm">{{  currentChatPartner?.status }}</div>
    </div>
  </div>
</template>

<style scoped>
</style>