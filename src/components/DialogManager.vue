<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useDialogStore } from '@/stores/dialogStore';
import useDialog from '@/composables/useDialog';
import { vOnClickOutside } from '@vueuse/components'

const { closeDialog } = useDialog();
const dialogStore = useDialogStore();
const { dialogs } = storeToRefs(dialogStore);

</script>

<template>
  <teleport to="body">
    <div
      class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center"
      v-for="dialog in dialogs"
      :key="dialog.id"
    >
      <component
        :is="dialog.component"
        v-bind="dialog.props"
        v-on-click-outside="()=> closeDialog(dialog.id)"
      />
    </div>
  </teleport>
</template>