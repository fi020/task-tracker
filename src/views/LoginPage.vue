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
    <p>or</p>
    <button class="signup">
      <router-link to="/signup">Signup</router-link>
    </button>

    <!-- Forgot Password Button -->
    <div>
      <button @click="handleForgotPassword">Forgot Password?</button>
    </div>
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
        const apiUrl = process.env.VUE_APP_API_URL;
        const response = await axios.post(`${apiUrl}/user/login`, {
          username: this.username,
          password: this.password,
        });

        // Extract the token from the response
        const token = response.data.token;

        // Store the token securely
        localStorage.setItem("token", token);

        // Update the global login state
        window.dispatchEvent(new Event('storage')); // Trigger the storage event

        // Redirect to the dashboard
        this.$router.push("/dashboard");
      } catch (error) {
        console.error("Login error:", error.response ? error.response.data : error.message);
        alert("Login failed. Please check your credentials and try again.");
      }
    },

    async handleForgotPassword() {
      const email = prompt("Please enter your email address to reset your password:");
      if (!email) return; // If no email is entered, do nothing

      try {
        const apiUrl = process.env.VUE_APP_API_URL;
        const response = await axios.post(`${apiUrl}/settings/forgot-password`, { email });

        // Success message
        alert(response.data.message || "Password has been sent to your email.");
      } catch (error) {
        console.error("Forgot password error:", error.response ? error.response.data : error.message);
        const errorMessage = error.response?.data?.message || "Error resetting password. Please try again.";
        const errorData = error.response?.data;
        console.log("Error data:", errorData);
        
        alert(errorMessage);

      }
    },
  },
};
</script>


<style scoped>
form {
  max-width: 300px;
  margin: auto;
  display: flex;
  flex-direction: column;
  /* color: wheat; */
  align-items: center;

}

input {
  margin-bottom: 20px;
  padding: 5px;
  border-radius: 5px;
}
form button{
  width: 100%;
  max-width: 200px;
  

}

button {
  background-color: #42b983;
  /* color: white; */
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  /* width: 10px; */
  margin-top: 5px;

}
button a{
  text-decoration: none;
}
.signup{
  border-radius: 5px;
}
</style>