<script setup lang="ts">
import { computed } from 'vue';
const profileImageApi = import.meta.env.VITE_PROFILE_IMAGE_API;

const props = defineProps({
  username: {
    type: String,
    required: true,
  },
  isGeneral: {
    type: Boolean,
    default: false,
  },
});

const src = computed(() => {
  return props.isGeneral ? 'https://api.dicebear.com/8.x/initials/svg?seed=General' : profileImageApi + props.username;
});

</script>
<template>
  <img class="w-10 h-10 rounded-full mr-2" :src="src" alt="Profile Image" />
</template>
<style scoped>

</style>