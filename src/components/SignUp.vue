<template>
  <div class="bg-blueDark">
    <h1 class="text-3xl text-center text-white pt-5 font-bold">
      Sign Up for free
    </h1>

    <div class="max-w-screen-sm mx-auto px-4 py-10">
      <!-- Error Handling -->
      <div v-if="errorMsg" class="mb-10 p-4 rounded-md bg-gray-200 shadow-lg">
        <p class="text-red-500">{{ errorMsg }}</p>
      </div>

      <!-- Register -->
      <form
        @submit.prevent="signUp()"
        class="bg-gradient-to-r from-orange-400 to-orange-800 p-8 flex flex-col bg-light-grey rounded-md shadow-lg"
      >
        <h1 class="text-3xl text-center font-bold text-blueDark0 mb-2">
          CREATE YOUR ACCOUNT
        </h1>

        <div class="flex flex-col mb-2">
          <label for="email" class="mb-1 text-sm text-at-light-green"
            >Email</label
          >
          <input
            type="text"
            required
            class="p-2 text-orange-500 focus:outline-none"
            id="email"
            v-model="email"
          />
        </div>

        <div class="flex flex-col mb-2">
          <label for="password" class="mb-1 text-sm text-blueDark"
            >Password</label
          >
          <input
            :type="passwordFieldType"
            required
            class="p-2 text-orange-500 focus:outline-none"
            id="password"
            v-model="password"
          />
        </div>

        <div class="flex flex-col mb-2">
          <label for="confirmPassword" class="mb-1 text-sm text-at-light-green"
            >Confirm Password</label
          >
          <input
            :type="passwordFieldType"
            required
            class="p-2 text-orange-500 focus:outline-none"
            id="confirmPassword"
            v-model="confirmPassword"
          />
        </div>

        <button
          type="submit"
          class="mt-6 py-2 px-6 self-center font-bold text-sm text-orange-500 bg-blueDark duration-200 border-solid border-2 border-transparent hover:border-at-light-green hover:bg-yellow-400 hover:font-bold hover:text-black rounded"
        >
          SIGN UP
        </button>
        <p class="">
          <span class="text-sm mt-6 text-center"
            >Already have an account?
          </span>
          <PersonalRouter
            :route="route"
            :buttonText="buttonText"
            class="text-blueDark text-decoration-line: underline"
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

      // if (error) throw error;
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

<style></style>

// Input Fields // Error Message // Show hide password variable // Show hide
confrimPassword variable // Router to push user once SignedUp to Log In // Arrow
function to SignUp user to supaBase with a timeOut() method for showing the
error
