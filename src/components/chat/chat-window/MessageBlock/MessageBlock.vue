<script setup lang="ts">
import { computed, inject, ref, watch} from 'vue';
import { useChatStore } from '@/stores/chatStore';
import { storeToRefs } from 'pinia';
import { useSelection } from '@/composables/useSelection';
import { useViewStore } from '@/stores/viewStore';
import { useSubscription } from '@vueuse/rxjs'
import { ChatWindowShareStateKey } from '../chat-window-share-state-key';
import type { ChatWindowShareState } from '../chat-window-share-state.model';
import { debounceTime, delay, filter } from 'rxjs';
import type { CustomStoreToRefs } from 'pinia-extensions';
import { useTextSelection } from '@vueuse/core'

const textSelectionState = useTextSelection()

const messageWrapper = ref<HTMLElement | null>(null)

const chatStore = useChatStore();
const {
  chat,
  currentChatMessages,
  currentChatPartner,
  isAutoScrollEnabled
} = storeToRefs(chatStore) as unknown as CustomStoreToRefs<typeof chatStore>;

const viewStore = useViewStore();
const { 
  isRealMobile,
  isMobile, 
} = storeToRefs(viewStore);

const chatWindowShareState = inject(ChatWindowShareStateKey) as ChatWindowShareState;

useSubscription(chatWindowShareState.chatBoxScrollToBottomObs$
.pipe(
  filter(() => isAutoScrollEnabled.value), // 判斷目前是否開啟自動滾動
  debounceTime(200), // 防止同時觸發多次滾動
  delay(0) // 等待當前渲染完成後再滾動
)
.subscribe(() => {
  messageWrapper.value?.scrollTo({top: messageWrapper.value.scrollHeight});
}));

const { selectIndex, selectedIndex, reset } = useSelection();

watch([
  () => currentChatPartner.value?.username,
  () => chat.value.currentRoom // 可能是自己的房間 (private_a_b) 或 對方的房間 (private_b_a)
], () => {
  reset();
});

const dynamicHeight = computed(() => {
  if (isRealMobile.value) {
    return {
      height: 'calc(100vh - 290px)'
    }
  }else {
    return {
      height: 'calc(100vh - 180px)'
    }
  }
});

const swipeRightHandler = () => {
  if(!isMobile.value){return;}
  if (!textSelectionState.text.value) {viewStore.goBack();}
}

</script>
<template>
  <div
    ref="messageWrapper" 
    class="relative pl-0 sm:pl-3 flex-1 flex flex-col min-w-[250px] sm:h-auto overflow-y-auto"
  >
    <div 
      class="flex-grow-0 p-4"
      :style="dynamicHeight"
      v-touch:swipe.right="swipeRightHandler"
    >
      <!-- Repeat similar message blocks for chat messages -->
      <template v-for="(message, index) in currentChatMessages" :key="message.id">
        <MessageItem 
          :isOwnMessage="message.sender === chat.userInfo?.username" 
          :index="index" :message="message"
          :currentChatPartner="currentChatPartner" 
          :openDropdownIndex="selectedIndex"
          @selectDropdownIndex="selectIndex" />
      </template>
    </div>
  </div>
</template>

<style scoped></style>