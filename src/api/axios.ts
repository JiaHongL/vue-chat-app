// src/axios.js
import axios from 'axios';
import { useUserStore } from '@/stores/userStore';
import useNotice from '@/composables/useNotice';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

instance.interceptors.request.use(
  config => {
    const userStore = useUserStore();
    const token = userStore.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => {
    return response;
  },
  async (error) => {
    if (error.response.status === 403) {
      const { notice } = useNotice();
      const userStore = useUserStore();
      await notice('You are not authorized to access this resource').onClose.then(() => {
        userStore.logout();
      });
    }
    return Promise.reject(error);
  }
);

export default instance;
