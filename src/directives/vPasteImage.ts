import type { DirectiveBinding } from 'vue';

interface HTMLElementWithHandlePaste extends HTMLElement {
  handlePaste?: (event: ClipboardEvent) => void;
}

export default {
  beforeMount(el: HTMLElementWithHandlePaste, binding: DirectiveBinding) {
    el.handlePaste = (event: ClipboardEvent) => {
      const items = event.clipboardData?.items;
      if (items && items.length > 0) {
        const latestItem = items[items.length - 1];
        if (latestItem.type.indexOf('image') !== -1) {
          const blob = latestItem.getAsFile();
          const reader = new FileReader();
          reader.onload = (e: ProgressEvent<FileReader>) => {
            const imageData = e.target?.result;
            if (imageData) {
              el.dispatchEvent(new CustomEvent('pasteImage', { detail: imageData }));
            }
          };
          reader.readAsDataURL(blob!);
          event.preventDefault();
        }
      }
    };
    el.addEventListener('paste', el.handlePaste);
  },
  unmounted(el: HTMLElementWithHandlePaste) {
    const handlePaste = el.handlePaste as (event: ClipboardEvent) => void;
    el.removeEventListener('paste', handlePaste);
  }
};

