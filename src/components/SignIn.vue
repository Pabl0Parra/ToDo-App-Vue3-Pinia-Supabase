<template>
  <div class="w-full h-screen flex">
    <img
      src="https://images.unsplash.com/photo-1540569876033-6e5d046a1d77?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
      alt="background"
      class="object-cover object-center h-screen w-7/12"
    />
    <div v-if="errorMsg" class="mb-10 p-4 rounded-md bg-light-grey shadow-lg">
      <p class="text-red-500">{{ errorMsg }}</p>
    </div>
    <!-- Login -->
    <form
      @submit.prevent="signIn"
      class="bg-white flex flex-col justify-center items-center w-5/12 shadow-lg"
    >
      <h1 class="text-3xl font-bold text-orange-500 mb-2">LOGIN</h1>
      <div class="w-1/2 text-center">
        <input
          class="shadow-md border w-full h-10 px-3 py-2 text-orange-500 focus:outline-none focus:border-orange-500 mb-3 rounded"
          type="text"
          placeholder="Email"
          v-model="email"
          id="email"
          required
        />

        <input
          class="shadow-md border w-full h-10 px-3 py-2 text-orange-500 focus:outline-none focus:border-orange-500 mb-3 rounded"
          :type="passwordFieldType"
          onpaste="return false"
          placeholder="Password"
          v-model="password"
          id="password"
          required
        />
        <span class="">
          <EyeIcon
            :class="[passwordFieldIcon]"
            @click.prevent="hidePassword = !hidePassword"
          />
        </span>
      </div>
      <button
        class="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded text-lg focus:outline-none shadow"
        type="submit"
      >
        Sign In
      </button>
      <p class="text-sm mt-6 text-center">Don't have an account?</p>
      <p
        class="text-at-light-green text-center hover:bg-orange-500 hover:text-white px-3 py-1 rounded"
      >
        <PersonalRouter :route="route" :buttonText="buttonText" />
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import PersonalRouter from "./PersonalRouter.vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";

// Route Variables
const route = "/auth/sign-up";
const buttonText = "Create one!";

// Input Fields
const email = ref("");
const password = ref("");

// Error Message
const errorMsg = ref("");

const passwordFieldIcon = ref("");
//Show hide password variables
const passwordFieldType = computed(() =>
  hidePassword.value ? "password" : "text"
);
const hidePassword = ref(true);

// Router to push user once SignedIn to the HomeView
const redirect = useRouter();

// Arrow function to Signin user to supaBase
const signIn = async () => {
  try {
    // calls the user store and send the users info to backend to logIn
    await useUserStore().signIn(email.value, password.value);
    // redirects user to the homeView
    redirect.push({ path: "/" });
  } catch (error) {
    // displays error message
    errorMsg.value = `Error: ${error.message}`;
    // hides error message
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  }
};
</script>

<style></style>
