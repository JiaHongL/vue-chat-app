<script setup lang="ts">
import { login } from '@/api/user';

const handleLogin = async () => {
  const result = await login({
    username: 'Joe',
    password: 'abc'
  });
  console.log(result.data);
}

handleLogin();

</script>

<template>
  <div>
  </div>
</template>

<style scoped>

</style>