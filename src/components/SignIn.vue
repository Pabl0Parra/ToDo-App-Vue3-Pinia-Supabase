<template>
  <div class="w-full h-screen flex">
    <img
      src="https://images.unsplash.com/photo-1540569876033-6e5d046a1d77?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
      alt="background"
      class="sign-img object-cover object-center h-screen w-7/12"
    />

    <!-- Login -->

    <form
      @submit.prevent="signIn"
      class="flex flex-col justify-evenly items-center w-5/12 shadow-lg"
    >
      <img
        class="logo"
        src="https://res.cloudinary.com/dcwx2biey/image/upload/v1665501348/Whale_Done_om7mfa.png"
        alt="logo"
      />
      <h2 class="text-3xl font-bold text-orange-500 mb-2">LOGIN</h2>
      <div class="w-1/2 text-center">
        <input
          class="shadow-md border w-full h-10 px-3 py-2 text-orange-500 focus:outline-none focus:border-orange-500 mb-3 rounded"
          type="text"
          placeholder="Email"
          v-model="email"
          id="email"
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
        <!-- NOT SHOWING ON UI -->
        <em
          class="fa-light fa-eye"
          @click.prevent="hidePassword = !hidePassword"
        >
        </em>
      </div>
      <button
        class="orange hover:bg-orange-600 font-bold text-white px-3 py-1 rounded text-lg focus:outline-none shadow-lg"
        type="submit"
      >
        SIGN IN
      </button>
      <!-- <p class="text-sm mt-6 text-center"></p> -->
      <p class="text-center px-3 py-1 rounded">
        Don't have an account?
        <PersonalRouter :route="route" :buttonText="buttonText" />
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import PersonalRouter from "./PersonalRouter.vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";

// Reference useUserStore
const userStore = useUserStore();
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
  // validates only email to not overkill app with floating windows (password = required only validation)
  if (validateInputs()) {
    try {
      // calls the user store and send the users info to backend to logIn
      await userStore.signIn(email.value, password.value);
      // redirects user to the homeView
      redirect.push({ path: "/" });
    } catch (error) {
      // displays error message with SweetAlert2
      Swal.fire({
        title: "Error",
        text: (errorMsg.value = `Error: ${error.message}`),
        icon: "warning",
        confirmButtonColor: "#f97316",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutDown",
        },
      });
    }
  }
};

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
      title: "Email is required",
      text: `Please, enter an email`,
      icon: "info",
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
  width: 280px;
}
.orange {
  background-color: #f97316 !important;
}

.orange:hover {
  background-color: #e36206 !important;
}

@media screen and (max-width: 600px) {
  .sign-img {
    display: none;
  }
  form {
    width: 100%;
  }
}
</style>
