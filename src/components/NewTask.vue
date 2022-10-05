<template>
  <div class="max-w-screen-md mx-auto px-4 py-10">
    <div v-if="error" class="mb-10 p-4 bg-light-grey rounded-md shadow-lg">
      <h3 class="text-red-500">{{ errorMsg }}</h3>
    </div>

    <!-- Create -->
    <div class="p-8 flex items-start bg-light-grey rounded-md shadow-lg">
      <!-- Form -->
      <form @submit.prevent="uploadTask" class="flex flex-col gap-y-5 w-full">
        <h1 class="text-3xl text-center font-bold text-orange-500 mb-2">
          Create new task
        </h1>
        <!-- Task title -->
        <div class="flex flex-col">
          <label for="taskTitle" class="mb-1 text-sm text-at-light-green"
            >Workout Name</label
          >
          <input
            class="shadow-md border w-full h-10 px-3 py-2 text-orange-500 focus:outline-none focus:border-orange-500 mb-3 rounded"
            v-model="taskTitle"
            type="text"
            id="newTaskTitle"
            placeholder="Title"
            name="taskTitle"
            required
          />
        </div>

        <!-- Task Description -->
        <div class="flex flex-col">
          <label for="taskDesc" class="mb-1 text-sm text-at-light-green"
            >Task Description</label
          >
          <input
            class="shadow-md border w-full h-10 px-3 py-2 text-orange-500 focus:outline-none focus:border-orange-500 mb-3 rounded"
            v-model="taskDesc"
            type="text"
            id="newTaskDesc"
            placeholder="Description"
            required
          />
        </div>
        <button
          @click.prevent="uploadTask"
          class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-white bg-orange-500 duration-200 border-solid border-2 border-transparent hover:border-at-light-green hover:bg-yellow-300 hover:text-black"
        >
          Create task
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { supabase } from "../supabase";
import { useTaskStore } from "../stores/task.js";

const emit = defineEmits(["childNewTask"]);

let taskTitle = ref("");
let taskDesc = ref("");
let error = ref(false);
const errorMsg = ref("");

function uploadTask() {
  if (taskTitle.value === "") {
    error.value = true;
    errorMsg.value = "Title is required.";
    setTimeout(() => {
      error.value = false;
    }, 3000);
  } else {
    emit("childNewTask", taskTitle.value, taskDesc.value);
    taskTitle.value = "";
    taskDesc.value = "";
    console.log(taskTitle.value);
  }
}

// constant to save a variable that define the custom event that will be emitted to the homeView

// constant to save a variable that holds the value of the title input field of the new task

// constant to save a variable that holds the value of the description input field of the new task

// constant to save a variable that holds an initial false boolean value for the errorMessage container that is conditionally displayed depending if the input field is empty

// const constant to save a variable that holds the value of the error message

// arrow function to call the form holding the task title and task description that uses a conditional to first checks if the task title is empty, if true the error message is displayed through the errorMessage container and sets a timeOut method that hides the error after some time. Else, its emmits a custom event to the home view with the task title and task description; clears the task title and task description input fields.
</script>

<style></style>
