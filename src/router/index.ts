import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from '@/stores/userStore';
import { jwtDecode } from 'jwt-decode';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/chat',
      name: 'Chat',
      component: () => import('../views/Chat.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/login'
    }
  ]
})

router.beforeEach((to, from) => {

  if (to.name === 'Login') {
    return true;
  }

  const userStore = useUserStore();
  const token = userStore.token;
  let decoded = null;

  try {
    decoded = jwtDecode<{
      username: string;
      exp: number;
      iat: number;
    }>(token);
  } catch (error) {
    userStore.logout();
  }

  const currentTime = Date.now() / 1000;

  if (
    !decoded?.username ||
    decoded.exp < currentTime
  ) {
    userStore.logout();
  }

});

export default router
