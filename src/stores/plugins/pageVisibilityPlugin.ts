import type { PiniaPluginContext } from 'pinia';
import { ref } from 'vue';

export function PageVisibilityPlugin({ store, options }: PiniaPluginContext) {
  if (options.usePageVisibility) {
    const isPageVisible = ref(!document.hidden);

    function handleVisibilityChange() {
      isPageVisible.value = !document.hidden;
    }

    const setupPageVisibility = () => {
      document.addEventListener('visibilitychange', handleVisibilityChange);

      // 返回一個清理函數
      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    };

    store.isPageVisible = isPageVisible;
    store.setupPageVisibility = setupPageVisibility;
  }
}
