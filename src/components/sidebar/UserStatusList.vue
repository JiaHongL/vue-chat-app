<script setup lang="ts">
import Avatar from '@/components/common/Avatar.vue';
import { useChatStore } from '@/stores/chatStore';
import { storeToRefs } from 'pinia'

const chatStore = useChatStore();
const { setCurrentRoom } = chatStore;
const {
  chat,
  onlineUsers,
  offlineUsers,
} = storeToRefs(chatStore);

</script>

<template>
  <div class="h-screen sm:pb-0 sm:h-auto min-w-[200px] w-100 bg-gray-100 p-4 flex flex-nowrap flex-col">
    <div class="overflow-scroll custom-scrollbar">
      <h2 class="sm:hidden text-center text-3xl">
        Friends
      </h2>
      <div class="flex-grow-0">
        <h3 class="font-semibold text-sm text-green-500">Online - {{ onlineUsers.length }}</h3>
      </div>
      <div class="flex-0 mb-3">
        <ul class="overflow-hidden">
          <!-- (click)="store.setCurrentRoom('private_' + store.userInfo()?.username + '_' + user.username);viewService.goToChatView();" -->
          <li v-for="user in onlineUsers" :key="user.username"
            @click="setCurrentRoom('private_' + chat?.userInfo?.username + '_' + user.username)"
            class="cursor-pointer flex items-center p-2 rounded-lg shadow mb-2 bg-white">
            <Avatar :username="user.username" />
            <div>
              <div
                class="font-semibold text-gray-700 max-w-[280px] sm:max-w-[85px] text-nowrap overflow-hidden text-ellipsis">
                {{ user.username }}
                <span v-if="user.username === chat?.userInfo?.username" class="text-xs text-blue-400">(You)</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="flex-grow-0">
        <h3 class="font-semibold text-sm text-gray-500">Offline - {{ offlineUsers.length }}</h3>
      </div>
      <div class="flex-0">
        <ul class="overflow-hidden pb-[250px] sm:pb-0">
          <!-- (click)="store.setCurrentRoom('private_' + store.userInfo()?.username + '_' + user.username);viewService.goToChatView()" -->
          <li v-for="user in offlineUsers" :key="user.username"
            @click="setCurrentRoom('private_' + chat?.userInfo?.username + '_' + user.username)"
            class="cursor-pointer flex items-center p-2 rounded-lg shadow mb-2 bg-gray-200 opacity-50">
            <Avatar :username="user.username" />
            <div>
              <div
                class="font-semibold text-gray-700 max-w-[280px] sm:max-w-[85px] text-nowrap overflow-hidden text-ellipsis">
                {{ user.username }}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped></style>