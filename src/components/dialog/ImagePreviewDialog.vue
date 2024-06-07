
<script setup lang="ts">
import { PropType } from "vue";
import useDialog from '@/composables/useDialog';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  data: {
    type: Object as PropType<{ 
      isSendButtonVisible?: boolean;
      base64String: string; 
    }>,
    default: () => ({ message: '' }),
  },
});

const { closeDialog } = useDialog();

const close = () => {
  closeDialog(props.id as string);
};

const send = () => {
  closeDialog(props.id as string, props.data.base64String);
};

</script>
<template>
  <div class="bg-white p-8 rounded-lg shadow-lg max-w-[550px] max-h-[550px] sm:max-w-[900px] sm:max-h-[900px]">
    
    <div class="flex justify-between items-center mb-6">
        <img 
          :src="data.base64String" 
          class="flex-1 object-contain max-w-[450px] max-w-h-[450px] sm:max-w-[800px] sm:max-h-[800] mx-auto" 
        />
    </div>

    <template v-if="data.isSendButtonVisible">
      <div class="flex justify-center space-x-4">
          <button
            type="button" 
            class="py-2 px-4 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 transition duration-200"
            @click="close()"
          >
              cancel
          </button>
          <button 
            class="py-2 px-4 bg-blue-500 text-white rounded-lg disabled:opacity-50 hover:bg-blue-600 hover:transition hover:duration-200"
            @click="send()"
          >Send</button>
      </div>
    </template>
    <template v-else>
      <div class="flex justify-center">
        <button 
          @click="close()" 
          class="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
        >close</button>
      </div>
    </template> 
  </div>
</template>

<style scoped>

</style>