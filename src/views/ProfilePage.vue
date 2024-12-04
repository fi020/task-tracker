<template>
    <div>
      <h1>Profile</h1>
      <p v-if="username">Welcome, <strong>{{ username }}</strong>!</p>
      <p v-else>Loading user details...</p>
  
      <button @click="logout">Logout</button>
      <router-link to="/dashboard">Go to Dashboard</router-link>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "ProfilePage",
    data() {
      return {
        username: null, // Will be set after fetching user details
      };
    },
    async created() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found. Please log in.");
        }
  
        // Fetch user details from the backend
        const apiUrl = process.env.VUE_APP_API_URL;
        const response = await axios.get(`${apiUrl}/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        // Set user details
        this.username = response.data.username;
      } catch (error) {
        console.error("Error fetching user details:", error.message);
        alert("Session expired or invalid. Please log in again.");
        this.$router.push("/login");
      }
    },
    methods: {
      logout() {
        // Clear token and redirect to login
        localStorage.removeItem("token");
        window.dispatchEvent(new Event('storage')); // Trigger the storage event

        this.$router.push("/login");
      },
    },
  };
  </script>
  
  <style scoped>
  button {
    background-color: red;
    /* color: white; */
    border: none;
    padding: 10px;
    cursor: pointer;
  }
  </style>
  