import type { PiniaPluginContext } from 'pinia'
import { ref, type Ref, onMounted, onUnmounted } from 'vue'

declare module 'pinia' {
  export interface DefineStoreOptionsBase<S, Store> {
    usePageVisibility?: boolean
  }
  export interface PiniaCustomProperties {
    isPageVisible: Ref<boolean>
  }
}

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
