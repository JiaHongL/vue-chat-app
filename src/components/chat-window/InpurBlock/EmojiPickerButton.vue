<script setup lang="ts">
import { ref } from 'vue';
import data from 'emoji-mart-vue-fast/data/all.json';
import { Picker, EmojiIndex } from 'emoji-mart-vue-fast/src';
import { useChatStore } from '@/stores/chatStore';
import { storeToRefs } from 'pinia';
import { vOnClickOutside } from '@vueuse/components'

const chatStore = useChatStore();
const { currentChatPartner } = storeToRefs(chatStore);
const emit = defineEmits(['selectEmoji']);

const emojiIndex = new EmojiIndex(data);
const showPicker = ref(false);

const togglePicker = () => {
  showPicker.value = !showPicker.value;
};

const addEmoji = (emoji) => {
  // showPicker.value = false; // 隱藏選擇器
  emit('selectEmoji', emoji.native);
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
    <picker 
      v-if="showPicker" 
      :data="emojiIndex" 
      set="twitter" 
      @select="addEmoji"
      v-on-click-outside="()=> showPicker = false" 
    />
  </div>
</template>

<style>
#emoji-picker-button {
  position: relative;
}
.emoji-mart {
  position: absolute;
  bottom: 50px;
  right: 0;
  z-index: 1000;
  background: black;
}

.emoji-mart {
  position: absolute;
  bottom: 40px;
  z-index: 1000;
  background-color: #2c2c2c !important;
  color: #fff !important;
}

#emoji-picker-button > section > div.emoji-mart-search > input[type=text] {
  background-color: #1f1f1f !important;
  background: #1f1f1f !important;
  color: #fff !important;
  margin-bottom: 5px;
}

.emoji-mart .emoji-mart-category-label {
  background-color: #2c2c2c !important;
  color: #fff !important;
}

.emoji-mart .emoji-mart-category .emoji-mart-emoji:hover {
  background-color: #333 !important;
}

.emoji-mart .emoji-mart-search input {
  border: 1px solid #444 !important;
}

.emoji-mart .emoji-mart-anchors {
  background-color: #1f1f1f !important;
}

.emoji-mart .emoji-mart-anchors a {
  color: #fff !important;
}

.emoji-mart .emoji-mart-anchors a.active {
  border-color: #666 !important;
}

</style>
