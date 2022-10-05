import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "./user";

// define task store and saved it into a constant for reference
export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: null,
  }),
  actions: {
    // async function to fetch all tasks from supabase
    async fetchTasks() {
      const { data: tasks } = await supabase
        .from("tasks")
        .select("*")
        .order("id", { ascending: true });
      this.tasks = tasks;
      return this.tasks;
    },
    // async function to add a task in supabase
    async addTask(title, description) {
      console.log(useUserStore().user.id);
      const { data, error } = await supabase.from("tasks").insert([
        {
          user_id: useUserStore().user.id,
          title: title,
          is_complete: false,
          description: description,
        },
      ]);
    },
    // async function to mark a task as completed in supabase
    async completeTask(id) {
      const { data, error } = await supabase
        .from("tasks")
        .update({ is_complete: true })
        .eq("id", id);
    },
    // async function to mark a task as uncompleted in supabase
    async uncompletedTask(id) {
      const { data, error } = await supabase
        .from("tasks")
        .update({ is_complete: false })
        .eq("id", id);
    },
    // async function to update a task in supabase
    async modifyTask(id, newTitle, newDescription) {
      const { data, error } = await supabase
        .from("tasks")
        .update({ title: newTitle, description: newDescription })
        // equal to (to update only matching rows)
        .eq("id", id);
    },
    // async function to delete all tasks from supabase
    async deleteAllTasks() {
      const { data, error } = await supabase
        .from("tasks")
        .delete()
        .eq("is_complete", false);
    },
    // async function to delete a particular task from supabase
    async deleteCertainTask(id) {
      const { data, error } = await supabase
        .from("tasks")
        .delete()
        .eq("id", id);
    },
  },
});
