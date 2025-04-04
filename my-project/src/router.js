import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/login.vue'

const routes = [
    {
      path: '/',
      name: 'login',
      component: () => import('./components/login.vue'),
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('./components/signup.vue'),
    },
    {
      path: '/main_page',
      name: 'main_page',
      component: () => import('./components/main_page.vue'),
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('./components/account.vue'),
    },
    {
      path: '/leaderboard',
      name: 'leaderboard',
      component: () => import('./components/leaderboard.vue'),
    },
    {
      path: '/room/:id',
      name: 'room_id',
      component: () => import('./components/start_page.vue'),
    },
    {
      path: '/subroom/:id/:type',
      name: 'subroom',
      component: () => import('./components/room_types.vue'),
    },
    {
      path: '/leaderboard/:id',
      name: 'leaderboard_id',
      component: () => import('./components/leaderboard.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(), 
    routes,
  });
  
  export default router;