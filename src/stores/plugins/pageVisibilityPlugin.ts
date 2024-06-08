import type { PiniaPluginContext } from 'pinia'
import { ref, type Ref, onMounted, onUnmounted } from 'vue'

export function PageVisibilityPlugin({ store, options }: PiniaPluginContext) {
  if (options.usePageVisibility) {
    const isPageVisible = ref(!document.hidden);

    function handleVisibilityChange() {
      isPageVisible.value = !document.hidden;
    }

    onMounted(() => {
      document.addEventListener('visibilitychange', handleVisibilityChange)
    })

    onUnmounted(() => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    })

    store.isPageVisible = isPageVisible
  }
}
