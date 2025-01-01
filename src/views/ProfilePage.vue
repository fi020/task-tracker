<template>
  <div>
    <h1>Profile</h1>
    <p v-if="username">Welcome, <strong>{{ username }}</strong>!</p>
    <p v-else>Loading user details...</p>

    <button @click="logout">Logout</button>

    <div class="user-links">
      <router-link to="/dashboard">Go to Dashboard</router-link>

      <router-link to="/settings">Settings</router-link>
    </div>

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
.user-links {
  display: flex;
  gap: 35px; /* Space between the links */
  justify-content: center; /* Align links to the left */
  padding: 10px; /* Add some padding around the links */

}
.user-links a {
  text-decoration: none; /* Remove underline */
  color: var(--user-nav-text-color); /* Set link color */
  font-weight: bold; /* Make the text bold */
}
.user-links a:hover {
  color: #0056b3; /* Darker blue on hover */
  text-decoration: none; /* Underline on hover */
  background-color: var(--user-nav-text-background-color);
  border-radius: 10px;
  padding: 5px;


}
</style>