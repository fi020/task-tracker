import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import SignupPage from '../views/SignupPage.vue';
import LoginPage from '../views/LoginPage.vue';
import ProfilePage from '../views/ProfilePage.vue';
// import DashboardPage from '../views/DashboardPage.vue';
import DashboardPage from '../views/DashboardPage.vue';
const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/signup', name: 'Signup', component: SignupPage },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/profile', name: 'Profile', component: ProfilePage },
  { path: '/dashboard', name: 'Dashboard', component: DashboardPage },
  // { path: "/profile", component: ProfilePage },

  // { path: "/dashboard", component: DashboardPage },
  // { path: "/", redirect: "/profile" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
