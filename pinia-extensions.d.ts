import { type Ref } from 'vue';

// CustomStoreToRefs type
export type CustomStoreToRefs<T> = {
  [K in keyof T]: T[K] extends Ref ? T[K] : Ref<T[K]>;
};

// pageVisibility plugin types
declare module 'pinia' {
  export interface DefineStoreOptionsBase<S, Store> {
    usePageVisibility?: boolean
  }
  export interface PiniaCustomProperties {
    isPageVisible: Ref<boolean>
    setupPageVisibility: () => () => void
  }
}

// autoScroll plugin types
declare module 'pinia' {
  export interface DefineStoreOptionsBase<S, Store> {
    useAutoScroll?: boolean
  }

  export interface PiniaCustomProperties {
    autoScroll: Ref<boolean>
    isAutoScrollEnabled: Ref<boolean>
    enableAutoScroll: (isTimeoutSet?: boolean) => void
    disableAutoScroll: () => void
  }
}