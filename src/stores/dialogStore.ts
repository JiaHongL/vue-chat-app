import { defineStore } from 'pinia';
import { ref, shallowRef } from 'vue';

export const useDialogStore = defineStore('dialog', () => {
  const dialogs = ref<{
    id: string;
    _onClose: (result: any) => void;
    component: any;
    props: {
      data?: any;
      [key: string]: any;
    };
  }[]>([]);

  const generateId = () => {
    const s4 = () => ((1 + Math.random()) * 0x10000).toString(16).substring(1);
    const timestamp = new Date().getTime();
    const timeString = timestamp.toString(16);
    const id = timeString + '-' + s4();
    return id;
  }

  const addDialog = (
    component: any,
    props: {
      data?: any;
      [key: string]: any;
    } = {}
  ) => {
    props.id = generateId();
    let closeResolve: any = null;
    const onClosePromise = new Promise<any>((resolve) => {
      closeResolve = resolve;
    });
    dialogs.value.push({
      id: props.id,
      _onClose: (result: any) => {
        closeResolve(result);
        removeDialog(props.id);
      },
      component: shallowRef(component),
      props
    });
    return {
      id: props.id,
      onClose: onClosePromise
    }
  };

  const removeDialog = (id: string) => {
    dialogs.value = dialogs.value.filter(dialog => dialog.id !== id);
  };

  const reset = () => {
    dialogs.value = [];
  }

  return {
    dialogs,
    addDialog,
    reset
  };

});
