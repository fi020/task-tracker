<template>
    <div>
      <h1>Profile</h1>
      <p>Welcome, <strong>{{ username }}</strong>!</p>
      <button @click="logout">Logout</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ProfilePage',
    data() {
      return {
        username: 'John Doe', // Replace this with actual data from the store or API
      };
    },
    methods: {
      logout() {
        // Placeholder for logout functionality
        console.log('User logged out');
        this.$router.push('/login'); // Redirect to login after logout
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
  </style>
  