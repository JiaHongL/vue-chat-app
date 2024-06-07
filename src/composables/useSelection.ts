import { ref } from 'vue';

export function useSelection() {
  const selectedIndex = ref(-1);

  const selectIndex = (index: number) => {
    selectedIndex.value = index;
  };

  const reset = () => {
    selectedIndex.value = -1;
  };

  return {
    selectedIndex,
    selectIndex,
    reset,
  };
}