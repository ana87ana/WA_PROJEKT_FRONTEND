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
      path: '/subroom/:id/number_guess',
      name: 'room_type_1',
      component: () => import('./components/subrooms/room_type_1.vue'),
      props: route => ({
        roomId: route.params.id,
        index: route.query.index || 0
      })
    },
    {
      path: '/subroom/:id/image_sentence',
      name: 'room_type_2',
      component: () => import('./components/subrooms/room_type_2.vue'),
      props: route => ({
        roomId: route.params.id,
        index: route.query.index || 0
      })
    },
    {
      path: '/subroom/:id/emoji_guess',
      name: 'room_type_3',
      component: () => import('./components/subrooms/room_type_3.vue'),
      props: route => ({
        roomId: route.params.id,
        index: route.query.index || 0
      })
    },
    {
      path: '/subroom/:id/person_connection',
      name: 'room_type_4',
      component: () => import('./components/subrooms/room_type_4.vue'),
      props: route => ({
        roomId: route.params.id,
        index: route.query.index || 0
      })
    },
    {
      path: '/escape-complete/:id',
      name: 'complete_room',
      component: () => import('./components/complete_room.vue'),
    },
    {
      path: '/leaderboard/:id',
      name: 'leaderboard_id',
      component: () => import('./components/leaderboard.vue'),
    },
    {
      path: '/admin/users',
      name: 'admin_users',
      component: () => import('./components/admin_users.vue'),
      meta: { requiresAdmin: true }
    },
    {path: '/create_eroom',
      name: 'create_eroom',
      component: () => import('./components/create_room.vue'),
      meta: { requiresAdmin: true }
    }
];

const router = createRouter({
    history: createWebHistory(), 
    routes,
  });
  
  export default router;