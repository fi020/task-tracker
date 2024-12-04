<template>
  <div id="app" :data-theme="isDarkMode ? 'dark' : 'light'">
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
      <button class="theme-toggle" @click="toggleTheme">
        {{ isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode' }}
      </button>
    </nav>

    <!-- Render the routed component -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isDarkMode: false, // Track light/dark mode
    };
  },
  mounted() {
    // Initialize theme based on localStorage
    const savedTheme = localStorage.getItem('theme');
    this.isDarkMode = savedTheme === 'dark';
    this.applyTheme();
  },
  methods: {
    toggleTheme() {
      this.isDarkMode = !this.isDarkMode;
      this.applyTheme();
    },
    applyTheme() {
      // Apply theme to the root element and save it to localStorage
      document.documentElement.setAttribute('data-theme', this.isDarkMode ? 'dark' : 'light');
      localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    },
  },
};
</script>

<style>
/* Light and Dark Mode Styles */
:root {
  --bg-color: #ffffff;
  --text-color: #2c3e50;
  --navbar-bg-color: #42b983;
  --navbar-text-color: white;
}

[data-theme='dark'] {
  --bg-color: #2c3e50;
  --text-color: #dfffe6;
  --navbar-bg-color: #1b2735;
  --navbar-text-color: #dfffe6;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--text-color);
  background-color: var(--bg-color);
  min-height: 100vh;
}

/* Navbar styling */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: var(--navbar-bg-color);
  color: var(--navbar-text-color);
}

.navbar-logo a {
  color: var(--navbar-text-color);
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
  color: var(--navbar-text-color);
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s;
}

.navbar-links a:hover {
  color: var(--bg-color);
}

.theme-toggle {
  background: none;
  border: 2px solid var(--navbar-text-color);
  padding: 5px 10px;
  color: var(--navbar-text-color);
  cursor: pointer;
  border-radius: 5px;
  font-weight: bold;
  transition: background-color 0.3s, color 0.3s;
}

.theme-toggle:hover {
  background-color: var(--navbar-text-color);
  color: var(--navbar-bg-color);
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
