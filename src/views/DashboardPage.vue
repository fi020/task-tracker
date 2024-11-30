<template>
    <div>
      <h1>Dashboard</h1>
      <h2>Your Tasks</h2>
      <ul v-if="tasks.length > 0">
        <li v-for="task in tasks" :key="task.id">
          <div>title - {{ task.title }}</div>
          <div>desc - {{ task.description }}</div>
            <div>Completed: {{ task.completed }} </div>
          <button @click="openEditForm(task)">Edit</button>
        </li>
      </ul>
      <p v-else>No tasks available.</p>
  
      <button @click="showCreateTaskForm = !showCreateTaskForm">
        Create New Task
      </button>
  
      <!-- Task Creation Form -->
      <create-task v-if="showCreateTaskForm" @task-created="fetchTasks" />
  
      <!-- Task Editing Form -->
      <edit-task
        v-if="editTaskData"
        :task="editTaskData"
        @task-updated="handleTaskUpdated"
        @cancel-edit="cancelEdit"
      />
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import CreateTask from "./CreateTask.vue";
  import EditTask from "./EditTask.vue";
  
  export default {
    name: "DashboardPage",
    components: { CreateTask, EditTask },
    data() {
      return {
        tasks: [], // Task list
        showCreateTaskForm: false, // Toggle create task form
        editTaskData: null, // Task to edit
      };
    },
    async created() {
      await this.fetchTasks(); // Fetch tasks on load
    },
    methods: {
      async fetchTasks() {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get("http://localhost:3000/tasks", {
            headers: { Authorization: `Bearer ${token}` },
          });
          this.tasks = response.data;
        } catch (error) {
          console.error("Error fetching tasks:", error.message);
        }
      },
      openEditForm(task) {
        this.editTaskData = { ...task }; // Clone task to avoid live editing
      },
      handleTaskUpdated() {
        this.editTaskData = null; // Close the edit form
        this.fetchTasks(); // Refresh tasks
      },
      cancelEdit() {
        this.editTaskData = null; // Close the edit form without saving
      },
    },
  };
  </script>
  
  <style scoped>
  button {
    background-color: #42b983;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    margin-left: 10px;
  }
  
  ul {
    color: white;
    list-style-type: none;
    padding-left: 0;
  }
  
  li {
    padding: 5px 0;
  }
  </style>
  