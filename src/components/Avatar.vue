<script setup lang="ts">
const profileImageApi = import.meta.env.VITE_PROFILE_IMAGE_API;
const { userName } = defineProps(['userName']);

</script>
<template>
  <img class="w-10 h-10 rounded-full mr-2" :src="profileImageApi + userName" alt="Profile Image" />
</template>
<style scoped>

</style>