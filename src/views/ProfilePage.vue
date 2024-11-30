<template>
    <div class="dashboard">
      <h1>Profile</h1>
      <p v-if="username">Welcome, <strong>{{ username }}</strong>!</p>
      <p v-else>Loading user details...</p>
  
      <h2>Your Tasks</h2>
      <ul v-if="tasks.length > 0">
        <li v-for="task in tasks" :key="task.id">
          <!-- {{ task.title }} - {{ task.status }} -->
          {{ task.title }} - {{ task.description }}
          - {{ task.completed }}
        </li>
      </ul>
      <p v-else>No tasks available.</p>
  
      <button @click="logout">Logout</button>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "ProfilePage",
    data() {
      return {
        username: null, // Will be set after fetching user details
        tasks: [], // Will hold the fetched tasks
      };
    },
    async created() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found. Please log in.");
        }
  
        // Fetch user details from the backend
        const userResponse = await axios.get("http://localhost:3000/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        // Set user details
        this.username = userResponse.data.username;
  
        // Fetch tasks associated with the user
        const tasksResponse = await axios.get("http://localhost:3000/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        // Set tasks data
        this.tasks = tasksResponse.data;
      } catch (error) {
        console.error("Error fetching user details or tasks:", error.message);
        alert("Session expired or invalid. Please log in again.");
        this.$router.push("/login");
      }
    },
    methods: {
      logout() {
        // Clear token and redirect to login
        localStorage.removeItem("token");
        this.$router.push("/login");
      },
    },
  };
  </script>
  
  <style scoped>
  button {
    background-color: red;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
  }
  .dashboard{
    color: white;

  }
  
  ul {
    list-style-type: none;
    padding-left: 0;
  }
  
  li {
    padding: 5px 0;
  }
  </style>
  