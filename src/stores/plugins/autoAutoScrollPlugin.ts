import type { PiniaPluginContext } from 'pinia'
import { ref, type Ref, computed } from 'vue'

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
