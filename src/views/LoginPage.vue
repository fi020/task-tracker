<template>
    <div>
      <h1>Login</h1>
      <form @submit.prevent="submitForm">
        <div>
          <label for="username">Username:</label>
          <input v-model="username" type="text" id="username" required />
        </div>
        <div>
          <label for="password">Password:</label>
          <input v-model="password" type="password" id="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "LoginPage",
    data() {
      return {
        username: "",
        password: "",
      };
    },
    methods: {
      async submitForm() {
        try {
          // Send login request to the backend
          const response = await axios.post("http://localhost:3000/user/login", {
            username: this.username,
            password: this.password,
          });
  
          // Extract the token from the response
          const token = response.data.token;
  
          // Store the token securely
          localStorage.setItem("token", token);
  
        //   alert("Login successful!");
  
          // Redirect to the profile page
          this.$router.push("/profile");
        } catch (error) {
          console.error("Login error:", error.response ? error.response.data : error.message);
          alert("Login failed. Please check your credentials and try again.");
        }
      },
    },
  };
  </script>
  
  <style scoped>
  form {
    max-width: 400px;
    margin: auto;
    display: flex;
    flex-direction: column;
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
  