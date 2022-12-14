<template>
  <div class="back h-full">
    <div class="max-w-screen-sm mx-auto px-4 py-10">
      <!-- Error Handling -->
      <!-- <div v-if="errorMsg" class="mb-10 p-4 rounded-md bg-gray-200 shadow-lg">
        <p class="text-red-500">{{ errorMsg }}</p>
      </div> -->

      <!-- Register -->
      <form
        @submit.prevent="signUp()"
        class="p-8 flex flex-col justify-evenly bg-white rounded-md shadow-lg"
      >
        <img
          class="logo self-center"
          src="https://res.cloudinary.com/dcwx2biey/image/upload/v1665501348/Whale_Done_om7mfa.png"
        />
        <h1 class="text-3xl text-center font-bold text-orange-500 mb-2">
          CREATE YOUR FREE ACCOUNT
        </h1>

        <div class="flex flex-col mb-2">
          <label for="email" class="mb-1 text-sm text-gray-500">Email</label>
          <input
            type="text"
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
            type="password"
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
            type="password"
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
          <span class="text-sm">Already have an account? </span>
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
import { ref } from "vue";
import { useRouter } from "vue-router";
import PersonalRouter from "./PersonalRouter.vue";
import { useUserStore } from "../stores/user";

// Route Variables
const route = "/auth/login";
const buttonText = "Login";

// Router to push user once SignedUp to Log In
const redirect = useRouter();

// Input Fields
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

// Error Message
const errorMsg = ref("");

// function to SignUp user to supaBase with a timeOut() method for showing the error
async function signUp() {
  if (validateInputs()) {
    if (password.value === confirmPassword.value) {
      try {
        await useUserStore().signUp(email.value, password.value);

        redirect.push({ path: "/auth/login" });
        // success msg sweetalert2
        Swal.fire({
          title: "Congratulations ",
          text: `Your account was created`,
          imageUrl:
            "https://res.cloudinary.com/dcwx2biey/image/upload/v1665693048/rocket_tb86im.gif",
          confirmButtonColor: "#f97316",
          imageAlt: "Success",
          imageWidth: "100px",
        });
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: (errorMsg.value = `Error: ${error.message}`),
          icon: "warning",
          confirmButtonColor: "#f97316",
        });
      }
      return;
    }
    // alert error through sweetalert2
    Swal.fire({
      title: "Error",
      text: `Passwords do not match`,
      icon: "error",
      confirmButtonColor: "#f97316",
    });
  }
}

const isValidEmail = (email) => {
  const emailRegEx =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  return emailRegEx.test(String(email).toLowerCase());
};

const validateInputs = () => {
  const emailValue = email.value.trim();

  let check = true;

  if (emailValue == "") {
    Swal.fire({
      title: "Error",
      text: `Email is required`,
      icon: "warning",
      iconColor: "#f97316",
      confirmButtonColor: "#f97316",
      showClass: {
        popup: "animate__animated animate__zoomInDown",
      },
      hideClass: {
        popup: "animate__animated animate__zoomOutDown",
      },
    });
    check = false;
  } else if (!isValidEmail(emailValue)) {
    Swal.fire({
      title: "Provide a valid email",
      text: `Enter something like john@gmail.com`,
      icon: "warning",
      iconColor: "#f97316",
      confirmButtonColor: "#f97316",
      showClass: {
        popup: "animate__animated animate__zoomInUp",
      },
      hideClass: {
        popup: "animate__animated animate__zoomOutUp",
      },
    });
    check = false;
  }

  return check;
};
</script>

<style scoped>
.logo {
  width: 120px;
}
.back {
  background-image: url("https://images.unsplash.com/photo-1540569876033-6e5d046a1d77?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=80");

  background-repeat: no-repeat;
  height: 100 vh;
  width: 100%;
}
.input-password-container {
  position: relative;
}
.eye-icon {
  position: absolute;
  width: 24px;
  right: 15px;
  bottom: 26px;
  cursor: pointer;
}
.eye-icon:hover {
  width: 26px;
}

button {
  background-color: #f97316;
}
</style>
