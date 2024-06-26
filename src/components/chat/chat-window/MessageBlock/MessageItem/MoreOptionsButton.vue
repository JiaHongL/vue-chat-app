<script setup lang="ts">
import { computed } from 'vue';
import { vOnClickOutside } from '@vueuse/components'

const props = defineProps({
  index: {
    type: Number,
    required: true,
  },
  message: {
    type: Object,
    required: true,
  },
  openDropdownIndex: {
    type: Number,
    required: true,
  },
  isSelfMessage: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits([
  'selectDropdownIndex',
  'replyMessage',
  'recallMessage',
]);

const isOpenDropdown = computed(() => props.openDropdownIndex === props.index);

</script>

<template>
    <div 
      class="min-w-[50px] h-100 flex justify-between"
      v-on-click-outside="()=> emit('selectDropdownIndex', -1)"
    >
      <div 
        class="group-hover:flex items-center text-left flex-col justify-center"
        :class="{
          'hidden': !isOpenDropdown
        }"
      >
        <button
          @click="emit('selectDropdownIndex', index)"
          class="relative z-10 text-gray-500 hover:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
          </svg>

          <template v-if="isOpenDropdown">
            <!-- Dropdown menu -->
            <div
              class="absolute top-0 z-20 flex flex-col  mt-2 w-30 bg-white border border-gray-200 rounded-lg shadow-lg"
              :class="{
                'right-[-80px]': isSelfMessage,
                'left-[-80px]': !isSelfMessage
              }"
            >
              <!-- Recall -->
              <template v-if="isSelfMessage">
                <a 
                  @click.stop="emit('selectDropdownIndex', -1);emit('recallMessage')"
                  class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  <svg class="w-5 h-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                  Recall
                </a>
              </template>
              <!-- Reply -->
              <a 
                @click.stop="emit('selectDropdownIndex', -1);emit('replyMessage')"
                class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                <svg class="w-5 h-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                </svg>
                Reply
              </a>
            </div> 
          </template>
        </button>
      </div>
    </div>
</template>

<style scoped>

</style>