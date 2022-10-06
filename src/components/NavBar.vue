<template>
  <nav class="navbar navbar-expand-lg fixed top-0 z-50">
    <div class="container-fluid">
      <a class="navbar-brand fw-bold ms-2" href="#">TASKA</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active home" aria-current="page" href="#"
              >Home</a
            >
          </li>
        </ul>
        <form class="d-flex" role="search">
          <button
            @click="signOut"
            class="btn logOut fw-bold mb-1"
            type="submit"
          >
            LOG OUT
          </button>
        </form>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useUserStore } from "../stores/user.js";
import { ref } from "vue";
import { useRouter } from "vue-router";
//constant to save a variable that will hold the use router method
const route = "/";

const error = ref("");
const errorMsg = ref(null);

const userStore = useUserStore();
// constant to save a variable that will get the user from store with a computed function imported from vue

const getUser = useUserStore().user;
// constant that calls user email from the useUSerStore
const userEmail = getUser.email;
// constant that saves the user email and cleans out the @client from the user
const emailName = userEmail.split("@");
// constant that saves useRouter into a variable
const redirect = useRouter();
// async function that calls the signOut method from the useUserStore and pushes the user back to the Auth view.

async function signOut() {
  await useUserStore().signOut();
  redirect.push({ path: "/auth/login" });
}
// const signOut = async () => {
//   try {
//     // calls the user store and send the users info to backend to signOut()
//     // console.log("entering try catch");
//     // console.log(userStore);
//     // console.log(userStore.signOut());

//     // redirects user to the homeView
//     console.log("redirección");
//     redirect.push({ path: "/auth/login" });
//     await userStore().signOut();
//   } catch (error) {
//     // displays error message
//     errorMsg.value = `Error: ${error.message}`;
//     // hides error message
//     setTimeout(() => {
//       errorMsg.value = null;
//     }, 5000);
//   }
// };
</script>

<style scope>
.navbar {
  background-color: #272c48 !important;
  height: 70px;
  position: sticky !important;
  border-bottom: 1px solid white;
}
.navbar-brand,
.home {
  color: #f97316 !important;
}
.navbar-brand:hover,
.home:hover {
  color: white !important;
}
.logOut {
  background-color: #f97316 !important;
}

.logOut:hover {
  background-color: gold !important;
}

.container-fluid {
  background-color: #272c48 !important;
}
</style>
