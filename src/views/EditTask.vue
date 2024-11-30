<template>
    <div>
      <h3>Edit Task</h3>
      <form @submit.prevent="updateTask">
        <div>
          <label for="title">Title:</label>
          <input v-model="updatedTask.title" type="text" id="title" required />
        </div>
        <div>
          <label for="description">Description:</label>
          <input v-model="updatedTask.description" type="text" id="description" required />
        </div>
        <div>
          <label for="completed">Completed:</label>
          <input v-model="updatedTask.completed" type="checkbox" id="completed" />
        </div>
        <button type="submit">Save Changes</button>
        <button type="button" @click="$emit('cancel-edit')">Cancel</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "EditTask",
    props: {
      task: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        updatedTask: { ...this.task }, // Clone the task to edit
      };
    },
    methods: {
      async updateTask() {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.patch(
            `http://localhost:3000/tasks/${this.updatedTask._id}`,
            {
              title: this.updatedTask.title,
              description: this.updatedTask.description,
              completed: this.updatedTask.completed,
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
  
          console.log(response.data);
          alert("Task updated successfully!");
          this.$emit("task-updated"); // Notify parent to refresh tasks
        } catch (error) {
          console.error("Error updating task:", error.message);
          alert("Failed to update task. Please try again.");
        }
      },
    },
  };
  </script>
  
  <style scoped>
  form {
    margin-top: 20px;
  }
  
  input {
    margin-bottom: 10px;
    padding: 5px;
  }
  
  button {
    background-color: #42b983;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    margin-right: 10px;
  }
  </style>
  