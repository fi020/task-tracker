<template>
    <div>
      <h1>Welcome to the Task Tracker App</h1>
      <p>
        Please <router-link to="/signup">Signup</router-link> or 
        <router-link to="/login">Login</router-link> to get started.
      </p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HomePage',
  };
  </script>
  
  <style scoped>
  h1 {
    color: #42b983;
  }
  p a{
    text-decoration: none;
    font-weight: bold;
color: #42b983;
  }
  </style>
  