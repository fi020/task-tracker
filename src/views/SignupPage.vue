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
        <input :type="showPassword ? 'text' : 'password'" v-model="password" id="password" required />
      </div>
      <p>password should contain 8 minimum characters A-Z , a-z , 0-9 and one special character (@$!%*?&)  </p>
      <div>
        <label for="confirmPassword">Confirm Password:</label>
        <input :type="showPassword ? 'text' : 'password'" v-model="confirmPassword" id="confirmPassword" required />
      </div>
      <div>
        <input type="checkbox" id="showPassword" v-model="showPassword" />
        <label for="showPassword">Show Password</label>
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
  name: "SignupPage",
  data() {
    return {
      username: "",
      password: "",
      confirmPassword: "",
      showPassword: false, // Control visibility of passwords
    };
  },
  methods: {
    checkPasswordStrength(password) {
      const strongPasswordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      // const strongPasswordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return strongPasswordRegex.test(password);
    },
    async submitForm() {
      if (this.password !== this.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      const isStrong = this.checkPasswordStrength(this.password);
      if (!isStrong) {
        const confirmWeakPassword = confirm(
          "Your password is weak. It is recommended to use a mix of upper and lower case letters, numbers, and special characters. Do you want to proceed with the current password?"
        );
        if (!confirmWeakPassword) {
          return;
        }
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
        this.$router.push("/login");
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
  /* max-width: 300px; */
  margin: auto;
  /* color: white; */
  align-items: center;

}

input {
  margin-bottom: 20px;
  border-radius: 5px;
  padding: 5px;


}
form button{
  width: 100%;
  max-width: 200px;
  

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
