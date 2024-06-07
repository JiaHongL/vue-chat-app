<script setup lang="ts">
import { inject } from 'vue';
import { ChatWindowShareStateKey } from './chat-window-share-state-key';
import type { ChatWindowShareState } from './chat-window-share-state.model';

const chatWindowShareState = inject<ChatWindowShareState>(ChatWindowShareStateKey);
const selectedMessage = chatWindowShareState?.selectedReplyMessage;
const updateSelectedReplyMessage = chatWindowShareState?.updateSelectedReplyMessage;

</script>

<template>
  <div class="relative p-4 border-t flex-shrink-0">
    <!-- 輸入列 -->
    <div class="flex items-center">
        <!-- #textArea
        appPasteImage
        [disabled]="!store.currentChatPartner()?.username"
        (imagePasted)="imagePasted($event)"
        [(ngModel)]="message" -->
      <textarea 
        placeholder="Type Your Message Here" 
        class="flex-grow px-4 py-2 bg-white border border-gray-300 rounded-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
        rows="2" 
        style="line-height: 1.5;"
      ></textarea>
        <!-- (focus)="saveSelection()" 
        (blur)="saveSelection();viewService.resetScroll()"
        (keydown.enter)="sendMessage($event)" -->

        <!-- [disabled]="!store.currentChatPartner()?.username"
        (click)="sendMessage()"  -->

      <button
        class="flex items-center justify-center w-10 h-10 ml-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
        <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>

      <!-- (click)="isShowEmojiMart.set(!isShowEmojiMart())"
      [disabled]="!store.currentChatPartner()?.username"  -->
      <button 
        class="hidden sm:flex items-center justify-center w-10 h-10 ml-2 text-gray-700 bg-white border border-gray-300 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
        <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
        </svg>
      </button>

      <!-- <app-image-upload 
        (upload)="sendBase64Message($event)"
      /> -->

    </div>
    <!-- reply message -->
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
  </div>
</template>

<style scoped>

</style>