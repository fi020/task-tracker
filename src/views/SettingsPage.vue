<template>
    <div>
      <h1>Settings</h1>
      <form @submit.prevent="updateUserDetails">
        <div>
          <label for="email">Add/Update Email:</label>
          <input id="email" v-model="email" type="email" placeholder="Enter your email" />
        </div>
        <div>
          <label for="username">Change Username:</label>
          <input id="username" v-model="username" type="text" placeholder="Enter your username" />
        </div>
        <div>
          <label for="password">Change Password:</label>
          <input id="password" v-model="password" type="password" placeholder="Enter your new password" />
        </div>
        <button type="submit">Save Changes</button>
      </form>
      <router-link to="/profile">Back to Profile</router-link>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "SettingsPage",
    data() {
      return {
        email: "",
        username: "",
        password: "",
      };
    },
    methods: {
      async updateUserDetails() {
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            throw new Error("No token found. Please log in.");
          }
  
          const apiUrl = process.env.VUE_APP_API_URL;
          const payload = {
            email: this.email || undefined,
            username: this.username || undefined,
            password: this.password || undefined,
          };
  
          await axios.put(`${apiUrl}/user/settings`, payload, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          alert("User details updated successfully!");
        } catch (error) {
          console.error("Error updating user details:", error.message);
          alert("Failed to update user details. Please try again.");
        }
      },
    },
  };
  </script>
  