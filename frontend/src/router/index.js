import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomePage.vue';
import Login from '../views/LoginPage.vue';
import Register from '../views/RegisterPage.vue';
import TaskList from '../views/TaskList.vue';
import TaskDetails from '../views/TaskDetails.vue';
import ChangePassword from '../views/ChangePassword.vue';
import DeleteAccount from '../views/DeleteAccount.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/tasks', component: TaskList },
  { path: '/tasks/:id', component: TaskDetails },
   { path: '/change-password', component: ChangePassword },
  { path: '/delete-account', component: DeleteAccount },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
