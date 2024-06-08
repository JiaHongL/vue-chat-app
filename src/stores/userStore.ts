import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import { useRouter } from 'vue-router';
import { useChatStore } from './chatStore';
import { useViewStore } from './viewStore';
import { useDialogStore } from './dialogStore';

export const useUserStore = defineStore('user', () => {
  const token = useStorage('token', '');
  const router = useRouter();

  const {
    reset: resetChat
  } = useChatStore();

  const {
    reset: resetView,
    resetScroll
  } = useViewStore();

  const {
    reset: resetDialog
  } = useDialogStore();

  const saveToken = (tk:string) => {
    token.value = tk;
  }

  const logout = () => {
    resetScroll();
    resetChat();
    resetView();
    resetDialog();
    token.value = '';
    router.push('/login');
  }

  return {
    token,
    saveToken,
    logout
  };

});
