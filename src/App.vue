<template>
  <div id="app">
    <!-- Navigation Bar -->
    <nav class="navbar">
      <div class="navbar-logo">
        <router-link to="/">TaskTracker</router-link>
      </div>
      <ul class="navbar-links">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/signup">Signup</router-link></li>
        <li><router-link to="/login">Login</router-link></li>
        <li><router-link to="/profile">Profile</router-link></li>
        <li><router-link to="/dashboard">Dashboard</router-link></li>
      </ul>
    </nav>

    <!-- Render the routed component -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/* Navbar styling */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
}

.navbar-logo a {
  color: white;
  text-decoration: none;
  font-size: 1.5em;
  font-weight: bold;
}

.navbar-links {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
}

.navbar-links li {
  margin: 0 10px;
}

.navbar-links a {
  color: white;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s;
}

.navbar-links a:hover {
  color: #dfffe6;
}

/* Responsive Design */
@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
  }

  .navbar-links {
    flex-direction: column;
    align-items: center;
  }

  .navbar-links li {
    margin: 5px 0;
  }
}
</style>
