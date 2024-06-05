import { useDialogStore } from "@/stores/dialogStore";

const useDialog = () => {
  const dialogStore = useDialogStore();

  const openDialog = (component: any, props?: {
    data?:any
  }) => {
    return dialogStore.addDialog(component, props);
  };

  const closeDialog = (id: string, result:any = null) => {
    const dialog = dialogStore.dialogs.find(dialog => dialog.id === id);
    dialog?._onClose(result);
  } 

  return {
    openDialog,
    closeDialog
  };
};

export default useDialog;
