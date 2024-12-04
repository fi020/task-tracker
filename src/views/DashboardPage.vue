<template>
    <div>
      <h1>Dashboard</h1>
      <h2>Your Tasks</h2>
      <ul v-if="tasks.length > 0">
        <li v-for="task in tasks" :key="task.id">
          <div>Title: {{ task.title }}</div>
          <div>Description: {{ task.description }}</div>
          <div>Completed: {{ task.completed }}</div>
          <button @click="openEditForm(task)">Edit</button>
          <button @click="openDeleteDialog(task._id)">Delete</button>
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
       <!-- Confirmation Dialog -->
    <ConfirmDialog 
      :isVisible="isDialogVisible" 
      @confirm="deleteTaskConfirmed" 
      @cancel="closeDeleteDialog" 
    />
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import CreateTask from "./CreateTask.vue";
  import EditTask from "./EditTask.vue";
  import ConfirmDialog from "./ConfirmDialog.vue";

  
  export default {
    name: "DashboardPage",
    components: { CreateTask, EditTask, ConfirmDialog },
    data() {
      return {
        tasks: [], // Task list
        showCreateTaskForm: false, // Toggle create task form
        editTaskData: null, // Task to edit
        isDialogVisible: false,
        confirmToDelete: false,
        taskToDelete : null,
      };
    },
    async created() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          // Redirect to login if no token is present
          this.$router.push("/login");
        } else {
          // Fetch tasks if logged in
          await this.fetchTasks();
        }
      } catch (error) {
        console.error("Error during authentication check:", error.message);
        this.$router.push("/login"); // Redirect in case of any error
      }
    },
    methods: {
      openDeleteDialog(taskId) {
      this.taskToDelete = taskId; // Set the task to delete
      this.isDialogVisible = true; // Show the dialog
    },
    closeDeleteDialog() {
      this.isDialogVisible = false; // Hide the dialog
      this.taskToDelete = null; // Reset the task to delete
    },
      async fetchTasks() {
        try {
          const token = localStorage.getItem("token");
          const apiUrl = process.env.VUE_APP_API_URL;
  
          const response = await axios.get(`${apiUrl}/tasks`, {
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
      async deleteTaskConfirmed() {
        // const isConfirmed = window.confirm("Are you sure you want to delete this task?");
        this.isDialogVisible = false; // Hide the dialog
        this.confirmToDelete= true;
        



        if (this.confirmToDelete) {
          try {
            const token = localStorage.getItem("token");
            const apiUrl = process.env.VUE_APP_API_URL;
    
            await axios.delete(`${apiUrl}/tasks/${this.taskToDelete}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            this.fetchTasks(); // Refresh task list after deletion
          } catch (error) {
            console.error("Error deleting task:", error.message);
          }
        }
        this.confirmToDelete = false;
        this.taskToDelete = null; // Reset the task to delete

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
  
  button:last-child {
    background-color: #e74c3c; /* Red color for delete button */
  }
  
  ul {
    /* color: white; */
    list-style-type: none;
    padding-left: 0;
  }
  
  li {
    padding: 5px 0;
  }
  </style>
  