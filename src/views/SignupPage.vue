<template>
  <div>
    <h2>Signup</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label for="username">Username:</label>
        <input v-model="username" type="text" id="username" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input v-model="password" type="password" id="password" required />
      </div>
      <div>
        <label for="confirmPassword">Confirm Password:</label>
        <input v-model="confirmPassword" type="password" id="confirmPassword" required />
      </div>
      <button type="submit">Sign Up</button>
    </form>
    <p>or</p>
    <button class="login">
      <router-link to="/login">Login</router-link>
    </button>
  
  </div>
</template>

<script>
import axios from "axios"; // Import Axios

export default {
  name: 'SignupPage',
  data() {
    return {
      username: '',
      password: '',
      confirmPassword: '',
    };
  },
  methods: {
    async submitForm() {
      if (this.password !== this.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      const apiUrl = process.env.VUE_APP_API_URL;
      try {
        const response = await axios.post(`${apiUrl}/user/signup`, {
          username: this.username,
          password: this.password,
        });
        
        console.log("Response:", response.data);
        alert("Signup successful!");

        // Redirect to the login page after successful registration
        this.$router.push('/login');
      } catch (error) {
        console.error("Signup error:", error.response ? error.response.data : error.message);
        alert("Signup failed. Please try again.");
      }
    },
  },
};
</script>

<style scoped>
/* Optional styling */
form {
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin: auto;
  /* color: white; */
}

input {
  margin-bottom: 10px;
}

button {
  background-color: #4CAF50;
  /* color: white; */
  padding: 10px;
  border: none;
  cursor: pointer;
  border-radius: 5px;

}
button a{
  text-decoration: none;
}
.login{
  border-radius: 5px;
}
</style>
