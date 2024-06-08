// stores/viewStore.ts
import { defineStore } from 'pinia';
import { ref, computed, onMounted, watch } from 'vue';
import { useEventListener, useWindowSize } from '@vueuse/core';

type View = 'friendListView' | 'chatListView' | 'chatWindowView';

export const useViewStore = defineStore('view', () => {
  const initView: View = 'friendListView';
  const currentView = ref<View>(initView);
  const previousView = ref<View>(initView);

  const { width: innerWidth } = useWindowSize();

  useEventListener(window, 'resize', () => {
    innerWidth.value = window.innerWidth;
  });
  
  const isRealMobile = ref(/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));

  const isMobile = computed(() => {
    const isSmallScreen = innerWidth.value < 640;
    return isRealMobile.value || isSmallScreen;
  });

  watch(isMobile, (value) => {
    if (value) {
      currentView.value = initView;
      previousView.value = initView;
    }
  });

  const updatePreviousView = () => {
    previousView.value = currentView.value;
  };

  const goToChatView = () => {
    updatePreviousView();
    currentView.value = 'chatWindowView';
  };

  const goToFriendList = () => {
    updatePreviousView();
    currentView.value = 'friendListView';
  };

  const goToChatList = () => {
    updatePreviousView();
    currentView.value = 'chatListView';
  };

  const goBack = () => {
    currentView.value = previousView.value;
  };

  const resetScroll = (ms = 200) => {
    setTimeout(() => {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }, ms);
  };

  const reset = () => {
    currentView.value = initView;
    previousView.value = initView;
  };

  return {
    currentView,
    isRealMobile,
    isMobile,
    goToChatView,
    goToFriendList,
    goToChatList,
    goBack,
    resetScroll,
    reset
  };
});
