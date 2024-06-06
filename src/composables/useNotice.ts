import { useDialogStore } from "@/stores/dialogStore";
import NoticeDialog from "@/components/dialog/NoticeDialog.vue";


const useNotice = () => {
  const dialogStore = useDialogStore();

  const notice = (message: string) => {
    return dialogStore.addDialog(NoticeDialog, { data: { message } });
  };

  const closeDialog = (id: string, result:any = null) => {
    const dialog = dialogStore.dialogs.find(dialog => dialog.id === id);
    dialog?._onClose(result);
  } 

  return {
    notice,
    closeDialog
  };

};

export default useNotice;