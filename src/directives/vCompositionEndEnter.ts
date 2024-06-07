const handleKeyDown = (event: KeyboardEvent) => {
  if (
    event.key === 'Enter' &&
    event.shiftKey === false && // shift + enter 是換行的行為
    !event.isComposing
  ) {
    event.preventDefault();
    event.currentTarget?.dispatchEvent(new CustomEvent('compositionEndEnter', { detail: event }));
  }
};

export default {
  beforeMount(el: HTMLElement) {
    el.addEventListener('keydown', handleKeyDown);
  },
  beforeUnmount(el: HTMLElement) {
    el.removeEventListener('keydown', handleKeyDown);
  }
};
