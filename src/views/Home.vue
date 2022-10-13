<template>
  <NavBar />

  <div class="text-center bg-gray-200">
    <h1 class="text-4xl pt-5 font-bold text-orange-500">ADD A NEW TASK</h1>
    <i class="mdi mdi-calendar-clock date"></i>
    <h3 class="text-xl pt-3 text-gray-500">
      {{ date }}
    </h3>
    <NewTask @add-task="addTask" />
  </div>

  <div>
    <TaskItem
      v-for="task in supabaseTasks"
      :key="task.id"
      :task="task"
      @add-toogle="addToggle"
      @delete-task="deleteTask"
      @edit-task="editTask"
    />
  </div>
  <Footer />
</template>

<script setup>
import NewTask from "../components/NewTask.vue";
import TaskItem from "../components/TaskItem.vue";
import { ref, onUpdated } from "vue";
import { useTaskStore } from "../stores/task.js";
import NavBar from "../components/NavBar.vue";
import Footer from "../components/Footer.vue";
import moment from "moment";

// task Store reference
const taskStore = useTaskStore();

// initialize empty supabase tasks array
const supabaseTasks = ref([]);

// async function to get the tasks already created in supabase
const getTasks = async () => {
  supabaseTasks.value = await taskStore.fetchTasks();
};
getTasks();

// create async functions to call the task store functions, which will be available in the rest of the components via emits
const addTask = async (title, desc) => {
  await taskStore.addTask(title, desc);
  getTasks();
};

const addToggle = async (isCompleted, id) => {
  await taskStore.tooggleTask(isCompleted, id);
  getTasks();
};

const deleteTask = async (id) => {
  await taskStore.deleteTask(id);
  getTasks();
};

const editTask = async (task) => {
  const newTitle = task.newTitle;
  const newDescription = task.newDescription;
  const taskId = task.oldIdValue.id;
  await taskStore.editTask(newTitle, newDescription, taskId);
  getTasks();
};

// store date into constant
const date = moment().format("MMM Do YY");
</script>
