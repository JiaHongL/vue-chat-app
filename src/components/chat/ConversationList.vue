<script setup lang="ts">
import { useChatStore } from '@/stores/chatStore';
import { storeToRefs } from 'pinia';
import { safeHtml, formatDate } from '@/utils';
import { useViewStore } from '@/stores/viewStore';
import { useUserStore } from '@/stores/userStore';

const viewStore = useViewStore();
const userStore = useUserStore();
const chatStore = useChatStore();
const { setCurrentRoom } = chatStore;
const {
  chat,
  currentChatPartner,
  messageNotifications
} = storeToRefs(chatStore);

</script>

<template>
  <div class="z-10 overflow-scroll custom-scrollbar inline-block w-screen h-screen sm:h-auto p-4 sm:max-w-[250px] sm:min-w-[250px] bg-gray-100 sm:p-4 sm:w-100 sm:h-100">
    <h2 class="sm:hidden text-center text-3xl">
		Chats
    </h2>
    <!-- 個人資訊 -->
    <div class="hidden sm:flex items-center mb-4">
      <template v-if="chat.userInfo?.username">
        <Avatar class="bg-white" :username="chat.userInfo?.username" />
        <span class="font-semibold text-xl text-gray-900 max-w-[110px] text-nowrap overflow-hidden text-ellipsis">{{ chat.userInfo?.username }}</span>
      </template>
      <button
        @click="userStore.logout()"
        class="ml-auto bg-orange-500 hover:bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H5a3 3 0 01-3-3V7a3 3 0 013-3h5a3 3 0 013 3v1"></path>
        </svg>
      </button>
    </div>
    <!-- 大廳 -->
    <h3 class="font-semibold text-sm text-gray-500 mb-1">General</h3>
    <div 
      class="cursor-pointer mb-2" 
      @click="setCurrentRoom('general');viewStore.goToChatView()"
    >
        <div 
          class="flex items-center p-2 rounded-lg shadow relative"
          :class="{
            'bg-blue-100': currentChatPartner?.username === 'general' && !viewStore.isMobile,
            'bg-white': currentChatPartner?.username !== 'general' || viewStore.isMobile,
          }"
        >
            <div class="relative flex-shrink-0 flex-grow-0">
              <img class="w-10 h-10 rounded-full mr-2" src="https://api.dicebear.com/8.x/initials/svg?seed=General" alt="Profile Image">
            </div>
            <div class="flex-grow overflow-hidden">
                <div>
                    <div class="font-semibold">
                      General
                      <span class="text-sm text-gray-500">
                        ({{ chat.users.length }})
                      </span>
                    </div>
                    <div class="w-4/5 text-gray-500 text-sm whitespace-nowrap overflow-hidden overflow-ellipsis">

                      <template v-if="messageNotifications.general.lastMessage.message.includes('data:image')">
                        {{
                          messageNotifications.general.lastMessage.sender === chat.userInfo?.username ? 'You' : messageNotifications.general.lastMessage.sender
                        }} sent a photo.
                      </template>
                      <template v-else>
                        {{ safeHtml(messageNotifications.general.lastMessage.message) }}
                      </template>
                    </div>
                </div>
                <span class="absolute top-2 right-2 text-blue-500 text-sm">{{ formatDate(messageNotifications.general.lastMessage.date)  }}</span>
                  <template v-if="messageNotifications.general.unreadCount">
                    <span 
                      class="absolute top-6 right-2 mt-1 mr-1 bg-red-500 text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full"
                      :class="{
                        'w-7': messageNotifications.general.unreadCount > 99,
                      }"
                    >{{ messageNotifications.general.unreadCount }}</span>
                  </template>
              </div>
        </div>
    </div>
    <!-- 私人訊息 -->
    <h3 class="font-semibold text-sm text-gray-500 mb-1">Private Message</h3>
    <ul class="pb-[250px] sm:pb-0 sm:max-h-73 sm:overflow-scroll custom-scrollbar">
      <!-- Repeat similar list items for other contacts -->
        <template
          v-for="user in messageNotifications.private"
          :key="user.username"
        >
          <template
            v-if="user.lastMessage"
          >
            <li 
              class="cursor-pointer mb-2"
              @click="setCurrentRoom(user.room);viewStore.goToChatView()"
            >
                <div 
                  class="flex items-center p-2 rounded-lg bg-blue-100 shadow relative"
                  :class="{ 
                    'bg-blue-100': currentChatPartner?.username === user.username && !viewStore.isMobile,
                    'bg-white': currentChatPartner?.username !== user.username || viewStore.isMobile,
                  }"
                >
                    <div class="relative flex-shrink-0 flex-grow-0">
                      <Avatar :username="user.username" />
                      <template v-if="user.status === 'online'">
                        <span class="absolute bottom-0 right-3 bg-green-600 w-2 h-2 rounded-full"></span>
                      </template>
                      <template v-else>
                        <span class="absolute bottom-0 right-3 bg-gray-500 w-2 h-2 rounded-full"></span>
                      </template>						
                    </div>
                    <div class="flex-grow overflow-hidden">
                        <div>
                            <div class="font-semibold max-w-[85%] sm:max-w-[110px] text-nowrap overflow-hidden text-ellipsis">
                              {{ safeHtml(user.username) }}
                            </div>
                            <div class="w-4/5 text-gray-500 text-sm whitespace-nowrap overflow-hidden overflow-ellipsis">
                              <template v-if="user.lastMessage.message.includes('data:image')">
                                {{
                                  user.lastMessage.sender === chat.userInfo?.username ? 'You' : user.lastMessage.sender
                                }} sent a photo.
                              </template>
                              <template v-else>
                                {{ safeHtml(user.lastMessage.message) }}
                              </template>
                            </div>
                        </div>
                        <span class="absolute top-2 right-2 text-blue-500 text-sm">{{ formatDate(user?.lastMessage?.date) }}</span>
                        <template v-if="user?.unreadCount">
                          <span 
                            class="absolute top-6 right-2 mt-1 mr-1 bg-red-500 text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full"
                            :class="{ 
                              'w-7': user?.unreadCount ?? 0 > 99,
                            }" 
                          >{{ user?.unreadCount }}</span>
                        </template>
                    </div>
                </div>
            </li>
          </template>
        </template>
    </ul>
  </div>
</template>

<style scoped></style>