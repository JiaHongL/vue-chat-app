<script setup lang="ts">
import EmojiPicker from 'vue3-emoji-picker'

import { ref } from 'vue';
import { useChatStore } from '@/stores/chatStore';
import { storeToRefs } from 'pinia';
import { vOnClickOutside } from '@vueuse/components'

const chatStore = useChatStore();
const { currentChatPartner } = storeToRefs(chatStore);
const emit = defineEmits(['selectEmoji']);

const showPicker = ref(false);

const togglePicker = () => {
  showPicker.value = !showPicker.value;
};

const addEmoji = (emoji:any) => {
  emit('selectEmoji', emoji.i);
};
</script>

<template>
  <div id="emoji-picker-button">
    <button
      @click="togglePicker"
      :disabled="!currentChatPartner?.username"
      class="hidden sm:flex items-center justify-center w-10 h-10 ml-2 text-gray-700 bg-white border border-gray-300 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
      <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
      </svg>
    </button>
    <EmojiPicker
      theme="dark"
      v-if="showPicker"
      :native="true" 
      @select="addEmoji"
      v-on-click-outside="()=> showPicker = false"  
    />
  </div>
</template>

<style>

#emoji-picker-button {
  position: relative;
}
.v3-emoji-picker{
  position: absolute;
  top: -330px;
  right: -20px;
  z-index: 1000;
}
</style>
