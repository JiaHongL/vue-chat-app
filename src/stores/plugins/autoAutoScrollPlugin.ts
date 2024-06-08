import type { PiniaPluginContext } from 'pinia'
import { ref, type Ref, computed } from 'vue'

// 擴展 Pinia 的類型來支持 useAutoScroll 選項
declare module 'pinia' {
  export interface DefineStoreOptionsBase<S, Store> {
    useAutoScroll?: boolean
  }

  export interface PiniaCustomProperties {
    autoScroll?: Ref<boolean>
    isAutoScrollEnabled: Ref<boolean>
    enableAutoScroll: (isTimeoutSet?: boolean) => void
    disableAutoScroll: () => void
  }
}

export function AutoScrollPlugin({ store, options }: PiniaPluginContext) {
  if (options.useAutoScroll) {
    const autoScroll = ref(true)

    const isAutoScrollEnabled = computed(() => autoScroll.value)

    function enableAutoScroll(isTimeoutSet: boolean = true) {
      if (isTimeoutSet) {
        setTimeout(() => {
          autoScroll.value = true
        }, 200)
      } else {
        autoScroll.value = true
      }
    }

    function disableAutoScroll() {
      autoScroll.value = false
    }

    store.isAutoScrollEnabled = isAutoScrollEnabled
    store.enableAutoScroll = enableAutoScroll
    store.disableAutoScroll = disableAutoScroll
  }
}
