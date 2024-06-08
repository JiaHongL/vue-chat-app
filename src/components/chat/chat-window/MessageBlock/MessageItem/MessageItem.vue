<script setup lang="ts">
import { safeHtml, formatDate , truncate} from '@/utils';
import { useChatStore } from '@/stores/chatStore';
import { inject } from 'vue';
import { ChatWindowShareStateKey } from '../../chat-window-share-state-key';
import type { ChatWindowShareState } from '../../chat-window-share-state.model';

const { recallMessage, undoRecallMessage } = useChatStore();

const chatWindowShareState = inject(ChatWindowShareStateKey) as ChatWindowShareState;

const props = defineProps({
  isOwnMessage: {
    type: Boolean,
    required: true,
  },
  currentChatPartner: {
    type: Object,
    required: true,
  },
  message: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  openDropdownIndex: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(['selectDropdownIndex']);

const scrollToMessage = (messageId:string) => {
  const messageElement = document.getElementById(`message-${messageId}`);
  if (messageElement) {
    messageElement.scrollIntoView({ behavior: 'smooth' });
  }
};

</script>

<template>

  <!-- 自己傳的訊息 -->
  <template v-if="isOwnMessage">
    <div :id="'message-' + message.id">
    <!-- 收回 -->
    <template v-if="message.isRecalled">
      <OwnMessageRecalled
        :sender="message.sender"
        :canUndo="true"
        @undoRecallMessage="undoRecallMessage(message.room, message.id)"
      />
    </template>
    <template v-else>
      <!-- 顯示 -->
      <div 
        class="flex justify-end group pb-5 ml-8"
      >
        <!-- 更多選單 -->
        <MoreOptionsButton
          :index="index"
          :message="message"
          :openDropdownIndex="openDropdownIndex"
          :isSelfMessage="true"
          @selectDropdownIndex="emit('selectDropdownIndex', $event)"
          @recallMessage="recallMessage(message.room, message.id)"
          @replyMessage="chatWindowShareState.updateSelectedReplyMessage(message)"
        /> 

        <div class="flex relative">
          <!-- 已讀 + 時間 -->
          <OwnMessageStatus
            :username="currentChatPartner?.username"
            :isRead="message.isRead"
            :readBy="message.readBy"
            :date="message.date"
          />
          <!-- 回覆的訊息區塊 -->
          <div>
              <!-- 有針對某個訊息進行回覆 -->
              <template v-if="message.replyToMessage">
                <div 
                  @click="scrollToMessage(message?.replyToMessage?.id)"
                  class="cursor-pointer ml-1 pb-1  flex bg-blue-500 rounded-t-lg text-white whitespace-pre-wrap border-y border-b-slate-300"
                >
                  <!-- 大頭貼 -->
                  <div class="flex shrink-0 items-center">
                    <Avatar class="w-6 h-6 rounded-full mx-2 bg-white" :username="message?.replyToMessage?.sender" />
                  </div>
                  <!-- 被回覆訊息被收回 -->
                  <template v-if="message?.replyToMessage?.isRecalled">
                    <OwnMessageRecalled
                      :sender="message.replyToMessage.sender"
                    />
                  </template>
                  <!-- 被回覆的訊息類型是圖片 -->
                  <template v-else-if="message?.replyToMessage?.message?.includes('data:image')">
                    <OwnRepliedMessageImage 
                      :sender="message.replyToMessage.sender" 
                      :message="message.replyToMessage.message" 
                    />
                  </template>
                  <!-- 被回覆的訊息類型是文字 -->
                  <template v-else>
                    <OwnRepliedMessageText 
                      :sender="message.replyToMessage.sender" 
                      :message="message.replyToMessage.message"
                    />
                  </template>
                </div>
              </template>
              <!-- 回覆內容 -->
              <OwnReplyContent
                :isReplyToMessage="!!message.replyToMessage"
                :message="message.message"
              />
          </div>
        </div>
      </div>
    </template>
  </div> 
  </template>

  <!-- 對方傳的訊息 -->
  <template v-else>
    <template v-if="message.isRecalled">
      <!-- 收回 -->
      <OtherMessageRecalled
        :currentChatPartnerUsername="currentChatPartner.username"
        :sender="message.sender"
      />
    </template>
    <template v-else>
      <div class="group pb-5 mr-8 flex">
        <div>
          <!-- 對方的頭像加文字 -->
          <div class="flex items-center mb-2">
            <Avatar class="w-6 h-6 rounded-full mr-2" :username="message.sender" />
            <div class="text-sm font-semibold">{{ message.sender }}</div>
          </div>
          <div class="flex">
            <div>
              <template v-if="message.replyToMessage">
                <div
                  @click="scrollToMessage(message?.replyToMessage?.id)"
                  class="cursor-pointer  pb-1  flex bg-gray-200 rounded-t-lg whitespace-pre-wrap border-y border-b-slate-300"
                >
                  <div class="flex shrink-0 items-center">
                    <Avatar class="w-6 h-6 rounded-full mx-2 bg-white" :username="message?.replyToMessage?.sender" />
                  </div>
                  <template v-if="message?.replyToMessage?.isRecalled">
                    <OtherMessageRecalled
                      :currentChatPartnerUsername="currentChatPartner.username"
                      :sender="message.replyToMessage.sender"
                      :styleType="'2'"
                    />
                  </template>
                  <template v-else-if="message?.replyToMessage?.message?.includes('data:image')">
                    <OtherRepliedMessageImage 
                      :sender="message.replyToMessage.sender" 
                      :message="message.replyToMessage.message"
                    />
                  </template>
                  <template v-else>
                    <OtherRepliedMessageText
                      :sender="message.replyToMessage.sender"
                      :message="message.replyToMessage.message"
                    />
                  </template>
                </div>
              </template>
              <OtherReplyContent
                :isReplyToMessage="!!message.replyToMessage"
                :message="message.message"
              />
            </div>
            <div class="ml-1 self-end text-left text-xs text-gray-500 mt-1">{{ formatDate(message.date) }}</div>
          </div>
        </div>
        <MoreOptionsButton
          :index="index"
          :message="message"
          :openDropdownIndex="openDropdownIndex"
          :isSelfMessage="false"
          @selectDropdownIndex="emit('selectDropdownIndex', $event)"
          @replyMessage="chatWindowShareState.updateSelectedReplyMessage(message)"
        /> 
      </div>
    </template>
  </template>

</template>

<style lang="scss" scoped>

</style>