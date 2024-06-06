<script setup lang="ts">
import { register } from '@/api/user';
import { defineProps } from 'vue';
import * as yup from 'yup';
import { useForm } from 'vee-validate';
import useDialog from '@/composables/useDialog';
import useNotice from '@/composables/useNotice';

const props = defineProps({
  id: {
    type: String,
    required: true,
  }
});

const { notice } = useNotice();

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
    const result = await register({
      username: values.username,
      password: values.password
    });
    notice(result.data.message).onClose.then(() => {
      closeDialog(props.id);
    });
  } catch (error) {
    const errorResponse = (error as any)?.response?.data;
    notice(errorResponse?.message);
  }
});

const { closeDialog } = useDialog();

const cancel = () => {
  closeDialog(props.id as string);
};

</script>

<template>
  <div class="bg-white p-8 rounded-lg shadow-lg w-96 sm:max-w-md sm:w-full">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-gray-900">Register</h2>
      <DialogCloseButton @click="cancel" />
    </div>
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
          placeholder="User Name">
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
      <div class="flex justify-end space-x-4">
        <button type="button"
          class="py-2 px-4 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 transition duration-200"
          @click="cancel"
        >Cancel</button>
        <button
          :disabled="!meta.valid" 
          type="submit"
          class="py-2 px-4 bg-blue-500 text-white rounded-lg disabled:opacity-50 hover:bg-blue-600 hover:transition hover:duration-200"
        >
          Register
        </button>
      </div>
    </form>
  </div>
</template>
