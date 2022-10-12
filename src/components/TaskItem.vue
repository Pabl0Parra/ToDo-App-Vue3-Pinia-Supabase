<template>
  <div class="flex flex-col items-center shadow-lg">
    <div
      :class="{ completed_style: isCompleted }"
      class="w-3/4 text-center m-5 border-2block p-6 rounded bg-blueDark shadow-lg dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <i class="fa-light fa-calendar-lines-pen"></i><span class="date"></span>
      <span class="text-xs text-white font-bold flex flex-row-reverse my-2">
        Date: {{ date }}
      </span>
      <hr class="text-orange-500" />
      <button @click="test">TEST</button>
      <h5
        class="mt-2 mb-2 text-2xl font-bold tracking-tight text-orange-500 overflow-hidden"
      >
        TITLE
      </h5>
      <h5
        @click="openEditTask"
        class="mt-2 mb-2 text-2xl font-bold tracking-tight text-white text-ellipsis overflow-hidden hover:underline hover:cursor-pointer hover:text-white"
      >
        {{ task.title }}
      </h5>
      <hr class="text-orange-500" />
      <h3 class="mt-2 font-bold text-2xl text-orange-500 overflow-hidden">
        DESCRIPTION
      </h3>
      <p
        @click="openEditTask"
        class="mt-2 font-bold text-white text-ellipsis overflow-hidden pt-3 py-2 hover:underline hover:cursor-pointer hover:text-white"
      >
        <em> {{ task.description }}</em>
      </p>
      <hr class="text-orange-500" />

      <div class="show-tools-mobile inline-flex gap-5 mt-3">
        <button
          class="bg-orange-500 hover:bg-yellow-400 font-bold text-white hover-text py-2 px-4 rounded"
          @click="addToggle"
        >
          DONE
        </button>
        <button
          class="bg-orange-500 hover:bg-yellow-400 font-bold text-white hover-text py-2 px-4 rounded"
          @click="deleteTask"
        >
          DELETE
        </button>
        <button
          class="bg-orange-500 hover:bg-yellow-400 font-bold text-white hover-text py-2 px-4 rounded"
          @click="openEditTask"
        >
          EDIT
        </button>
      </div>

      <div v-if="editChecked">
        <form @submit.prevent="editTask" class="flex flex-col">
          <input
            type="text"
            v-model="titleEdited"
            placeholder="New title"
            class="p-2 m-2 mt-4 text-center text-orange-500 rounded focus:outline-none"
          />

          <textarea
            type="text"
            v-model="descriptionEdited"
            placeholder="New description"
            class="p-2 m-2 text-center text-orange-500 rounded focus:outline-none"
          />

          <button
            class="w-full mt-6 p-3 px-6 self-start font-bold text-white bg-orange-500 duration-200 border-transparent hover:bg-yellow-400 hover-text rounded"
          >
            UPDATE TASK
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import moment from "moment";
moment.locale("es");
const date = moment(Date.now()).format("MMMM Do YYYY, h:mm:ss a");

const id = ref(props.task.id);

// a boolean to store a false
const editChecked = ref(false);

const titleEdited = ref("");
const descriptionEdited = ref("");

let showTools = ref(false);

let isCompleted = ref(props.task.isCompleted);

// Function to handle the edit dialogue where the inputField is displayed and the string used to store the value of the inputField will be used here to save the value as a prop on this function.
// const showToolsHandler = () => {
//   showTools.value = !showTools.value;
//   editChecked.value = false;
// };

const props = defineProps({
  task: Object,
});

// Store the custom emit events that will be used to call the functions of the homeView for editing, deleting and toggling the status[completed, not complted] of the taskItem
const emit = defineEmits(["delete-task", "add-toogle", "edit-task"]);

// *********************** Define functions that trigger the emits ************************

// Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be send via the prop to the parent component. This function can control the toggle completion of the task on the homeview.
const addToggle = () => {
  isCompleted.value = !isCompleted.value;
  emit("add-toogle", isCompleted.value, id.value);
};

// Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be send via the prop to the parent component. This function can control the removal of  the task on the homeview.

const deleteTask = () => {
  // Wait for the user to press a button...
  Swal.fire({
    title: "Are you sure you want to delete this task?",
    showCancelButton: true,
    confirmButtonText: "Confirm",
    cancelButtonText: "Cancel",
    icon: "warning",
  }).then((result) => {
    if (result.isConfirmed) {
      emit("delete-task", props.task.id);
      Swal.fire("Poof!", "Your file has been deleted!", "success");
    }
  });
};

const openEditTask = () => {
  editChecked.value = !editChecked.value;
  titleEdited.value = props.task.title;
  descriptionEdited.value = props.task.description;
};

// Function to edit the task information that you decided that the user can edit. This function's body takes in a conditional that first checks if the value of the task [either title and description or just title] is empty which if true it runs the function used to handle the error on hint4. Else, the conditional sets the first mentioned boolean data property on hint2 back to its inital boolean value to hide the error message and repeat the same for the data property mentioned 4th on hint2; a constant that stores an object that holds the oldValue from the prop item and the value of the task coming from the data property mentioned 3rd on hint2; a custom event emit() that takes 2 parameters a name for the custom event and the value from the object used on this part of the conditional and lastly this part of the conditional sets the value of input field to an empty string to clear it from the ui.
const editTask = () => {
  const editValues = {
    newTitle: titleEdited.value,
    newDescription: descriptionEdited.value,
    oldIdValue: props.task,
  };
  emit("edit-task", editValues);
  editChecked.value = !editChecked.value;
};

const test = async () => {
  console.log(titleEdited.value);
  console.log(props.task.title);
  const { value: formValues } = await Swal.fire({
    title: "Multiple inputs",
    html:
      `<input id="swal-input1" class="swal2-input" placeholder="${props.task.title}" required>` +
      `<input id="swal-input2" class="swal2-input" placeholder="${props.task.description}" required >`,
    focusConfirm: false,
    preConfirm: () => {
      return [
        document.getElementById("swal-input1").value,
        document.getElementById("swal-input2").value,
      ];
    },
  });

  if (formValues[0] === "" || formValues[1] === "") {
    console.log("Title cannot be empty");
  }

  if (formValues) {
    Swal.fire(console.log(JSON.stringify(formValues)));

    const editValues = {
      newTitle: formValues[0],
      newDescription: formValues[1],
      oldIdValue: props.task,
    };
    emit("edit-task", editValues);
    editChecked.value = !editChecked.value;
  }
};
</script>

<style scoped>
.completed_style {
  background: rgb(27, 190, 30);
  text-decoration: line-through;
}
.hover-text:hover {
  color: #272c48 !important;
}

@media screen and (max-width: 600px) {
  .show-tools-mobile {
    flex-direction: column;
    width: 90%;
    gap: 1 !important;
  }
}
</style>

<!-- 

2. Data properties need here are the following: a boolean to store a false**Important variable, a string to store an error, a string to store the value of the task that the user can edit, an initial false boolean to hide the inputFIeld used to edit the new task detail or details[this is in reference of the task title and the task description].

4. Function to handle the error with the data properties used to control the error and the the boolean controlling the boolean empty variable.

-->
