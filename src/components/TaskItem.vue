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
      <h5
        class="mt-2 mb-2 text-2xl font-bold tracking-tight text-orange-500 overflow-hidden"
      >
        TITLE
      </h5>
      <h4
        @click="editTask"
        class="mt-2 mb-2 text-2xl font-bold tracking-tight text-white text-ellipsis overflow-hidden hover:underline hover:cursor-pointer hover:text-white"
      >
        {{ task.title }}
      </h4>
      <hr class="text-orange-500" />
      <h3 class="mt-2 font-bold text-2xl text-orange-500 overflow-hidden">
        DESCRIPTION
      </h3>
      <p
        @click="editTask"
        class="mt-2 font-bold text-white text-ellipsis overflow-hidden pt-3 py-2 hover:underline hover:cursor-pointer hover:text-white"
      >
        <em> {{ task.description }}</em>
      </p>
      <hr class="text-orange-500" />

      <div class="show-tools-mobile inline-flex gap-5 mt-3">
        <button
          id="Button"
          class="btn-disabled bg-orange-500 hover:bg-yellow-400 font-bold text-white hover-text py-2 px-4 rounded"
          @click="addToggle"
          v-if="!isCompleted"
        >
          DONE
        </button>
        <button
          id="Button"
          class="opacity-50 cursor-not-allowed bg-orange-500 font-bold text-white py-2 px-4 rounded"
          v-if="isCompleted"
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
          class="btn-disabled bg-orange-500 hover:bg-yellow-400 font-bold text-white hover-text py-2 px-4 rounded"
          @click="editTask"
          v-if="!isCompleted"
        >
          EDIT
        </button>
        <button
          class="opacity-50 cursor-not-allowed bg-orange-500 font-bold text-transparent py-2 px-4 rounded"
          v-if="isCompleted"
        >
          EDIT
        </button>
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

let isCompleted = ref(props.task.isCompleted);

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
    confirmButtonColor: "#f97316",
    icon: "warning",
    iconColor: "#f97316",
  }).then((result) => {
    if (result.isConfirmed) {
      emit("delete-task", props.task.id);
      Swal.fire({
        title: "Poof!",
        text: "Your file has been deleted!",
        imageUrl:
          "https://res.cloudinary.com/dcwx2biey/image/upload/v1665697288/185-trash-bin-flat_yvdu2t.gif",
        imageWidth: "80px",
        confirmButtonColor: "#f97316",
        showClass: {
          popup: "animate__animated animate__bounceInLeft",
        },

        hideClass: {
          popup: "animate__animated animate__bounceOutRight",
        },
      });
    }
  });
};

// Function to edit the task information that you decided that the user can edit. This function's body takes in a conditional that first checks if the value of the task [either title and description or just title] is empty which if true it runs the function used to handle the error on hint4. Else, the conditional sets the first mentioned boolean data property on hint2 back to its inital boolean value to hide the error message and repeat the same for the data property mentioned 4th on hint2; a constant that stores an object that holds the oldValue from the prop item and the value of the task coming from the data property mentioned 3rd on hint2; a custom event emit() that takes 2 parameters a name for the custom event and the value from the object used on this part of the conditional and lastly this part of the conditional sets the value of input field to an empty string to clear it from the ui.
const editTask = async () => {
  const { value: formValues } = await Swal.fire({
    imageUrl:
      "https://res.cloudinary.com/dcwx2biey/image/upload/v1665730319/245-edit-document-flat_1_jalpw3.gif",
    imageWidth: "100px",
    showCancelButton: true,
    confirmButtonText: "Update Task",
    cancelButtonText: "Cancel",
    confirmButtonColor: "#f97316",
    title: "Enter new title & description",
    html:
      `<input id="swal-input1" class="swal2-input" placeholder="${props.task.title}" required>` +
      `<input id="swal-input2" class="swal2-input" placeholder="${props.task.description}" required >`,
    focusConfirm: false,
    showClass: {
      popup: "animate__animated animate__zoomInDown",
    },
    hideClass: {
      popup: "animate__animated animate__zoomOutDown",
    },
    preConfirm: () => {
      return [
        document.getElementById("swal-input1").value,
        document.getElementById("swal-input2").value,
      ];
    },
  });

  if (formValues[0] === "" || formValues[1] === "") {
    Swal.fire({
      title: "Error",
      text: "Please try again, fields cannot be empty",
      icon: "error",
      confirmButtonColor: "#f97316",
      background: "#464c6d",
      showClass: {
        popup: "animate__animated animate__rubberBand",
      },
      hideClass: {
        popup: "animate__animated animate__rollOut",
      },
    });
  }

  if (formValues) {
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
  background: rgb(66, 76, 167);
}
.completed_style > p {
  text-decoration: line-through;
  cursor: none;
}
.completed_style > h4 {
  text-decoration: line-through;
  cursor: none;
}
.cursor-not-allowed {
  cursor: none;
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
