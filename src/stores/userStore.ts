import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core'

export const useUserStore = defineStore('user', () => {
  const token = useStorage('token', '');

  const saveToken = (tk:string) => {
    token.value = tk;
  }

  return {
    token,
    saveToken
  };

});
