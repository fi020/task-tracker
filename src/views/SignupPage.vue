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
  </div>
</template>

<script>
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
    submitForm() {
      if (this.password !== this.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      
      // Here, you would make an API call to your backend to register the user.
      // For now, we'll just print the details to the console for demonstration.
      console.log("User Registered:", this.username, this.password);

      // After successful registration, you can redirect to login or other pages
      this.$router.push('/login');
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
}

input {
  margin-bottom: 10px;
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
}
</style>
