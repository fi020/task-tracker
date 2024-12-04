<template>
    <div>
      <h3>Create Task</h3>
      <form @submit.prevent="createTask">
        <div>
          <label for="title">Title:</label>
          <input v-model="newTask.title" type="text" id="title" required />
        </div>
        <div>
          <label for="description">Description:</label>
          <input v-model="newTask.description" type="text" id="description" required />
        </div>
        <button type="submit">Save Task</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "CreateTask",
    data() {
      return {
        newTask: {
          title: "", // Title of the task
          description: "", // Description of the task
        },
      };
    },
    methods: {
      async createTask() {
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            throw new Error("No token found. Please log in.");
          }
  
          // Send title and description only
          const response = await axios.post(
              `http://localhost:3000/tasks`,
              {
                  title: this.newTask.title,
                  description: this.newTask.description,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            
            console.log(response.data);

  
          // Emit event to parent to refresh tasks list
          this.$emit("task-created");
          this.newTask = { title: "", description: "" }; // Reset form
          alert("Task created successfully!");
        } catch (error) {
          console.error("Error creating task:", error.message);
          alert("Failed to create task. Please try again.");
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
  }
  </style>
  