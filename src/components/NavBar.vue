<template>
  <nav class="navbar navbar-expand-lg fixed top-0 z-50">
    <div class="container-fluid border-bottom-2 border-solid border-white">
      <img
        class="logo"
        src="https://res.cloudinary.com/dcwx2biey/image/upload/v1665501348/logo-blue_phk5di.png"
        alt="logo"
      />

      <button
        class="navbar-toggler hamburguer-bg"
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
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-5">
          <li class="nav-item">
            <a class="nav-link active home fw-bold" aria-current="page" href="#"
              >Home</a
            >
          </li>
        </ul>
        <form class="d-flex" role="search">
          <div class="welcome-mobile" style="margin-top: 1rem">
            <p style="color: white">
              <strong>Welcome</strong>
              <span class="user-name">{{ emailName[0] }}</span>
            </p>
          </div>
          <button
            @click="signOut"
            class="btn logOut fw-bold mb-1 rounded"
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
.logo {
  width: 80px;
}
.logOut {
  background-color: #f97316 !important;
}

.logOut:hover {
  background-color: gold !important;
}

.container-fluid {
  background-color: #272c48 !important;
  -webkit-box-shadow: 0px 13px 10px -6px rgba(227, 227, 227, 0.91);
  -moz-box-shadow: 0px 13px 10px -6px rgba(227, 227, 227, 0.91);
  box-shadow: 0px 13px 10px -6px rgba(227, 227, 227, 0.91);
}
.user-name {
  color: #f97316 !important;
  margin-right: 6%;
  padding: 1rem;
}

.btn {
  color: white !important;
}
.btn:hover {
  color: #272c48 !important;
}
.hamburguer-bg {
  background-color: #f97316 !important;
  border: none;
}
.hamburguer-bg:hover {
  background-color: gold !important;
}
</style>
