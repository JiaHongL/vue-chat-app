<script setup lang="ts">
const props = defineProps({
  sender: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

</script>
<template>
  <div class="flex justify-center items-center">
    <div class=" text-black">{{ sender }}</div>
    <img 
      class="max-w-[80px] max-h-[80px] mt-1 ml-1 mr-1 rounded-lg" 
      :src="message" 
      alt="Image"
    >
  </div>
</template>
<style scoped>

</style>