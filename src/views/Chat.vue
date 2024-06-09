<script setup lang="ts">
import { useChatStore } from '@/stores/chatStore';
import { useViewStore } from '@/stores/viewStore';
import { storeToRefs } from 'pinia';
import { useTitle } from '@vueuse/core'
import { onUnmounted, watch } from 'vue';
import { Subject, interval, map, startWith, takeUntil, tap } from 'rxjs';
import ChatLayout  from '@/layouts/ChatLayout.vue';

const chatStore = useChatStore();
const { allUnreadCount} = storeToRefs(chatStore);
const cleanupPageVisibility = chatStore?.setupPageVisibility();
chatStore.connectWebSocket();

const viewStore = useViewStore();
const { isRealMobile } = storeToRefs(viewStore);

const title = useTitle();
const destroy$ = new Subject<void>();

const closeAllUnreadCountWatch = watch(()=> allUnreadCount.value, (newAllUnreadCount) => {
  if (isRealMobile.value) { return; }
  destroy$.next();
  if (newAllUnreadCount > 0) {
    interval(700).pipe(
      startWith(0),
      map(() => title.value),
      tap(currentTitle => {
        if (currentTitle?.includes('New messages')) {
          title.value = `VueChatApp`;
        } else {
          title.value = `🔔 New messages ( ${newAllUnreadCount} )`;
        }
      }),
      takeUntil(destroy$)
    ).subscribe();
  }else{
    title.value = 'VueChatApp';
  }
});

onUnmounted(() => {
  destroy$.next();
  destroy$.complete();
  closeAllUnreadCountWatch();
  cleanupPageVisibility();
})

</script>

<template>
  <ChatLayout>
    <!-- 訊息通知 -->
    <template #conversationList>
      <ConversationList />
    </template>
    <!-- 對話視窗 -->
    <template #chatWindow="slotProps">
      <ChatWindow :usageContext="slotProps.usageContext"/>
    </template>
    <!-- 好友列表 -->
    <template #userStatusList>
      <UserStatusList />
    </template>
    <!-- 底部導覽 (mobile) -->
    <template #bottomNavigation>
      <BottomNavigation />
    </template>
  </ChatLayout>
</template>

<style scoped></style>
