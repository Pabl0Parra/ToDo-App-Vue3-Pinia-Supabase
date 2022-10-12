<template>
  <div class="flex flex-col justify-center">
    <form
      class="flex flex-col self-center items-center p-5 mb-2 text-center w-3/4"
      @submit.prevent="addTask"
    >
      <input
        type="text"
        placeholder="Add title here"
        id="title"
        v-model="title"
        class="p-3 m-2 focus:outline-none rounded w-full text-center text-orange-500 shadow-lg"
      />

      <textarea
        type="text"
        placeholder="Add description here"
        id="description"
        v-model="description"
        class="p-3 m-2 focus:outline-none rounded w-full text-center text-orange-500 shadow-lg"
      />
      <button
        class="mt-6 p-3 px-6 self-start text-sm text-white font-bold bg-orange-500 duration-200 border-transparent hover:bg-blueDark hover:text-orange-500 rounded w-full shadow-lg"
      >
        ADD TASK
      </button>
    </form>
    <div v-if="errorWhitoutTitle" class="text-red-500 mb-5 pb-5">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// constant to save a variable that define the custom event that will be emitted to the homeView
const emit = defineEmits(["add-task"]);
// constant to save a variable that holds the value of the title input field of the new task
const title = ref(null);
// constant to save a variable that holds the value of the description input field of the new task
const description = ref(null);

// arrow function to call the form holding the task title and task description that uses a conditional to first checks if the task title is empty, if true the error message is displayed through the errorMessage container and sets a timeOut method that hides the error after some time. Else, its emmits a custom event to the home view with the task title and task description; clears the task title and task description input fields.
const addTask = () => {
  if (
    title.value === "" ||
    title.value === null ||
    description.value === "" ||
    description.value === null
  ) {
    Swal.fire({
      title: "Error",
      text: "Please enter a title and a description",
      icon: "warning",
      confirmButtonColor: "#f97316",
      showClass: {
        popup: "animate__animated animate__rotateInDownRight",
      },
      hideClass: {
        popup: "animate__animated animate__hinge",
      },
    });
  } else {
    emit("add-task", title.value, description.value);
    title.value = "";
    description.value = "";
  }
};
</script>

<style scoped>
button:hover {
  color: #f97316 !important;
}
</style>
