<template>
  <div class="max-w-screen-sm mx-auto px-4 py-10">
    <div v-if="errorMsg" class="mb-10 p-4 rounded-md bg-light-grey shadow-lg">
      <p class="text-red-500">{{ errorMsg }}</p>
    </div>
    <!-- Login -->
    <form
      @submit.prevent="signIn"
      class="p-8 flex flex-col bg-light-grey rounded-md shadow-lg"
    >
      <h1 class="text-3xl text-at-light-green mb-4">Sign in</h1>
      <div class="flex flex-col mb-2">
        <label class="mb-1 text-sm text-at-light-green" for="email">Email</label
        ><br />
        <input
          class="p-2 text-gray-500 focus:outline-none"
          type="text"
          placeholder="dave@wuTangfinancial.com"
          v-model="email"
          id="email"
          required
        />
      </div>
      <div class="flex flex-col mb-2">
        <label class="mb-1 text-sm text-at-light-green" for="password"
          >Password</label
        >
        <input
          class="p-2 text-gray-500 focus:outline-none"
          :type="passwordFieldType"
          onpaste="return false"
          placeholder="************"
          v-model="password"
          id="password"
        />
        <span class="">
          <EyeIcon
            :class="[passwordFieldIcon]"
            @click.prevent="hidePassword = !hidePassword"
          />
        </span>
      </div>
      <button
        class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-green duration-200 border-solid border-2 border-transparent hover:border-at-light-green hover:bg-white hover:text-at-light-green"
        type="submit"
      >
        Sign In
      </button>
      <p class="text-sm mt-6 text-center">Don't have an account?</p>
      <p class="text-at-light-green text-center">
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

<style>
.wu-text {
  color: black;
}

.form {
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
}
.input {
  color: black;
  margin-bottom: 1rem;
}
.button {
  background-color: #4caf50; /* Green */
  border: none;
  color: white;
  padding: 10px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
</style>
