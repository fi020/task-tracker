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
  export default {
    name: 'LoginPage',
    data() {
      return {
        username: '',
        password: '',
      };
    },
    methods: {
      submitForm() {
        // Placeholder for API integration
        console.log('User logged in:', this.username);
        this.$router.push('/profile'); // Redirect to profile after login
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
  