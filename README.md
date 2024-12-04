# tut
# need to learn some advance functionalities of git and github
# remove the env file from all branches as accidently push
git filter-branch --index-filter "git rm -rf --cached --ignore-unmatch .env" --prune-empty --tag-name-filter cat -- --all

git filter-branch --index-filter "git rm -rf --cached --ignore-unmatch .env" --prune-empty --tag-name-filter cat -- --all

rm -rf .git/refs/original
git reflog expire --expire=now --all
git gc --prune=now --aggressive

git push origin --force --all
git push origin --force --tags

# end of env remove

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



color: #42b983;



<template>
  <div id="app" :data-theme="isDarkMode ? 'dark' : 'light'">
    <!-- Navigation Bar -->
    <nav class="navbar">
      <div class="navbar-logo">
        <router-link to="/">TaskTracker</router-link>
      </div>
      <ul class="navbar-links">
        <li><router-link to="/">Home</router-link></li>
        <li v-if="!isLoggedIn"><router-link to="/signup">Signup</router-link></li>
        <li v-if="!isLoggedIn"><router-link to="/login">Login</router-link></li>
        <li v-if="isLoggedIn"><router-link to="/profile">Profile</router-link></li>
        <li v-if="isLoggedIn"><router-link to="/dashboard">Dashboard</router-link></li>
      </ul>
      <button class="theme-toggle" @click="toggleTheme">
        {{ isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode' }}
      </button>
      <button v-if="isLoggedIn" @click="logout">Logout</button>
    </nav>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isDarkMode: false,
      isLoggedIn: false, // Track login state
    };
  },
  mounted() {
    // Initialize theme and login status
    this.applyTheme();
    this.checkLoginStatus();

    // Listen for storage changes (login/logout)
    window.addEventListener('storage', this.checkLoginStatus);
  },
  methods: {
    checkLoginStatus() {
      const token = localStorage.getItem('token');
      this.isLoggedIn = !!token; // Update login state
      console.log('Login status updated:', this.isLoggedIn);
    },
    toggleTheme() {
      this.isDarkMode = !this.isDarkMode;
      this.applyTheme();
    },
    applyTheme() {
      const savedTheme = localStorage.getItem('theme');
      this.isDarkMode = savedTheme === 'dark';
      document.documentElement.setAttribute('data-theme', this.isDarkMode ? 'dark' : 'light');
    },
    logout() {
        // Clear token and redirect to login
        localStorage.removeItem("token");
        window.dispatchEvent(new Event('storage')); // Trigger the storage event

        this.$router.push("/login");
      },
  },
  // beforeDestroy() {
  //   // Clean up event listener
  //   window.removeEventListener('storage', this.checkLoginStatus);
  // },
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
