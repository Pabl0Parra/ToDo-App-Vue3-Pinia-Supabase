<template>
  <div class="back">
    <div class="max-w-screen-sm mx-auto px-4 py-10">
      <!-- Error Handling -->
      <div v-if="errorMsg" class="mb-10 p-4 rounded-md bg-gray-200 shadow-lg">
        <p class="text-red-500">{{ errorMsg }}</p>
      </div>

      <!-- Register -->
      <form
        @submit.prevent="signUp()"
        class="p-8 flex flex-col bg-white rounded-md shadow-lg"
      >
        <h1 class="text-3xl text-center font-bold text-orange-500 mb-2">
          CREATE YOUR FREE ACCOUNT
        </h1>

        <div class="flex flex-col mb-2">
          <label for="email" class="mb-1 text-sm text-gray-500">Email</label>
          <input
            type="text"
            required
            class="shadow-md border w-full h-10 px-3 py-2 text-orange-500 focus:outline-none focus:border-orange-500 mb-3 rounded"
            id="email"
            v-model="email"
          />
        </div>

        <div class="flex flex-col mb-2">
          <label for="password" class="mb-1 text-sm text-gray-500"
            >Password</label
          >
          <input
            :type="passwordFieldType"
            required
            class="shadow-md border w-full h-10 px-3 py-2 text-orange-500 focus:outline-none focus:border-orange-500 mb-3 rounded"
            id="password"
            v-model="password"
          />
        </div>

        <div class="flex flex-col mb-2">
          <label for="confirmPassword" class="mb-1 text-sm text-gray-500"
            >Confirm Password</label
          >
          <input
            :type="passwordFieldType"
            required
            class="shadow-md border w-full h-10 px-3 py-2 text-orange-500 focus:outline-none focus:border-orange-500 mb-3 rounded"
            id="confirmPassword"
            v-model="confirmPassword"
          />
        </div>

        <button
          type="submit"
          class="mt-3 py-2 px-6 self-center font-bold text-white bg-orange-500 duration-200 border-solid border-2 border-transparent hover:bg-orange-700 hover:font-bold rounded"
        >
          SIGN UP
        </button>
        <p class="">
          <span class="text-sm text-center">Already have an account? </span>
          <PersonalRouter
            :route="route"
            :buttonText="buttonText"
            class="text-decoration-line: underline"
          />
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import PersonalRouter from "./PersonalRouter.vue";
import { useUserStore } from "../stores/user";

// Route Variables
const route = "/auth/login";
const buttonText = "Login";

// Input Fields
const email = ref(null);
const password = ref(null);
const confirmPassword = ref(null);

// Error Message
const errorMsg = ref(null);

// Show hide password variable
const passwordFieldType = computed(() =>
  hidePassword.value ? "password" : "text"
);
const hidePassword = ref(true);

// Show hide confirmPassword variable
const confirmPasswordFieldType = computed(() =>
  hideConfirmPassword.value ? "confirmPassword" : "text"
);
const hideConfirmPassword = ref(true);

// Router to push user once SignedUp to Log In
const redirect = useRouter();

// function to SignUp user to supaBase with a timeOut() method for showing the error
async function signUp() {
  if (password.value === confirmPassword.value) {
    try {
      await useUserStore().signUp(email.value, password.value);

      redirect.push({ path: "/auth/login" });
    } catch (error) {
      errorMsg.value = error.message;
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    }
    return;
  }
  errorMsg.value = "Passwords do not match";
  setTimeout(() => {
    errorMsg.value = null;
  }, 5000);
}
</script>

<style scoped>
.back {
  background-image: url("https://images.unsplash.com/photo-1540569876033-6e5d046a1d77?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=80");

  background-repeat: no-repeat;
}

button {
  background-color: #f97316;
}
</style>
