import { ref } from 'vue';

interface CursorPosition {
  start: number;
  end: number;
}

export function useInsertAtCursor() {
  const cursorPosition = ref<CursorPosition | null>({
    start: 0,
    end: 0,
  });

  const saveCursorPosition = (event: FocusEvent) => {
    const textarea = event.target as HTMLTextAreaElement;
    cursorPosition.value = {
      start: textarea.selectionStart,
      end: textarea.selectionEnd,
    };
  };

  const insertAtCursor = (text: string, message: string) => {
    if (cursorPosition.value) {
      const start = cursorPosition.value.start;
      const end = cursorPosition.value.end;
      const before = message.substring(0, start);
      const after = message.substring(end);
      const newMessage = before + text + after;
      // 更新光標位置
      cursorPosition.value.start = cursorPosition.value.end = start + text.length;
      return newMessage;
    }
    return message;
  };

  const resetCursorPosition = () => {
    cursorPosition.value = {
      start: 0,
      end: 0,
    };
  }

  return {
    saveCursorPosition,
    insertAtCursor,
    resetCursorPosition
  };
}
