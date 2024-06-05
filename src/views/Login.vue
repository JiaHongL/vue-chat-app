<script setup lang="ts">
import { login } from '@/api/user';
import * as yup from 'yup';
import { useForm } from 'vee-validate';
import RegisterDialog from '@/components/RegisterDialog.vue';
import useDialog from '@/composables/useDialog.ts';

const { openDialog } = useDialog();

const { meta, handleSubmit, defineField } = useForm({
  initialValues: {
    username: '',
    password: ''
  },
  validationSchema: {
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
  }
});

const [username, usernameAttrs] = defineField('username');
const [password, passwordAttrs] = defineField('password');

const onSubmit = handleSubmit(async (values) => {
  try {
    const result = await login({
      username: values.username,
      password: values.password
    });
    console.log(result);
  } catch (error) {
    console.error(error);
  }
});

const openRegisterDialog = async () => {
  openDialog(RegisterDialog);
};

</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="bg-white p-4 rounded-lg shadow-xl sm:max-w-md sm:w-full">
      <div class="flex justify-center mb-6">
        <div class="bg-blue-100 p-3 rounded-full">
          <svg class="w-10 h-10 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14.93C6.17 16.93 3 13.76 3 10S6.17 3.07 10 3.07 17 6.24 17 10s-3.17 6.93-7 6.93zM10 7c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm0 3c-1.1 0-2 .9-2 2v3h4v-3c0-1.1-.9-2-2-2z">
            </path>
          </svg>
        </div>
      </div>
      <h2 class="text-3xl font-bold text-gray-900 text-center mb-2 sm:mb-4">Chat!</h2>
      <p class="text-gray-500 text-center mb-6">Don't have an account yet?
        <a @click="openRegisterDialog" class="text-blue-500 cursor-pointer">Sign up</a>
      </p>
      <form @submit="onSubmit">
        <div class="mb-4">
          <label class="block text-gray-700 mb-1" for="username">Name</label>
          <input 
            v-model="username" 
            v-bind="usernameAttrs" 
            name="username" 
            type="text" 
            id="username"
            class="w-full p-3 rounded-lg bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="User Name"
          >
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 mb-1" for="password">Password</label>
          <input 
            v-model="password" 
            v-bind="passwordAttrs" 
            name="password" 
            type="password" 
            id="password"
            class="w-full p-3 rounded-lg bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Password"
          >
        </div>
        <div class="flex justify-center">
          <button 
            :disabled="!meta.valid" 
            type="submit"
            class="py-2 px-4 bg-blue-500 text-white rounded-lg disabled:opacity-50 hover:bg-blue-600 hover:transition hover:duration-200">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>