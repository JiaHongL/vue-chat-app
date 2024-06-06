<script setup lang="ts">
import { ref } from 'vue';
import { useChatStore } from '@/stores/chatStore';
import { storeToRefs } from 'pinia';
import { useSelection } from '@/composables/useSelection';

const chatStore = useChatStore();
const {
  chat,
  currentChatMessages,
  currentChatPartner
} = storeToRefs(chatStore);

const { selectIndex, selectedIndex, reset } = useSelection(); 

const dynamicHeight = ref(() => {
  return {
    height: 'calc(100vh - 180px)'
  };
});

</script>
<template>
  <div 
    class="relative pl-0 sm:pl-3 flex-1 flex flex-col min-w-[250px] sm:h-auto"
  >
    <!-- #chatBox
    (click)="isShowEmojiMart.set(false)" -->
    <div 
      class="flex-grow-0 p-4 overflow-y-auto"
      :style="dynamicHeight()"
    >
      <!-- Repeat similar message blocks for chat messages -->
      <template 
        v-for="(message, index) in currentChatMessages"
        :key="message.room"
      >
          <MessageItem
            :isOwnMessage="message.sender === chat.userInfo?.username"
            :index="index"
            :message="message"
            :currentChatPartner="currentChatPartner"
            :openDropdownIndex="selectedIndex"
            @selectDropdownIndex="selectIndex"
          />
        </template>
      <!-- </template> -->
    </div>
  </div>
</template>

<style scoped>

</style>