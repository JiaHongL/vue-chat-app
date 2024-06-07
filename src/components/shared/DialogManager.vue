<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useDialogStore } from '@/stores/dialogStore';
import useDialog from '@/composables/useDialog';

const { closeDialog } = useDialog();
const dialogStore = useDialogStore();
const { dialogs } = storeToRefs(dialogStore);

</script>

<template>
  <teleport to="body">
    <div
      class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50"
      v-for="dialog in dialogs"
      :key="dialog.id"
      @click.self="closeDialog(dialog.id)"
    >
        <component
          :is="dialog.component"
          v-bind="dialog.props"
        />
    </div>
  </teleport>
</template>