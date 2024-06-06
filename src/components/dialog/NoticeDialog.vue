<script setup lang="ts">
import DialogCloseButton from '@/components/common/DialogCloseButton.vue';
import useNotice from '@/composables/useNotice';
import type { PropType } from 'vue';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  data: {
    type: Object as PropType<{ message: string }>,
    default: () => ({ message: '' }),
  },
});

const { closeDialog } = useNotice();

</script>

<template>
    <div class="bg-white p-8 rounded-lg shadow-lg w-96 sm:max-w-md sm:w-full">
      <div class="flex justify-between items-center mb-6">
        <h2 id="notification-title" class="text-2xl font-bold text-gray-900">Notice</h2>
        <DialogCloseButton @click="closeDialog(props.id)"/>
      </div>
      <p id="notification-message" class="text-gray-700 mb-4">
        {{ data.message }}
      </p>
      <div class="flex justify-center">
        <button
          @click="closeDialog(props.id)"
          class="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
        >close</button>
      </div>
    </div>
</template>