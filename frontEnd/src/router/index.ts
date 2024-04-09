import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import HomeView from '../views/HomeView.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/location',
    name: 'Location',
    component: () => import(/* webpackChunkName: "location" */ '../views/LocationView.vue'),
  },
  {
    path: '/appointment',
    name: 'Appointment',
    component: () => import(/* webpackChunkName: "location" */ '../views/BookAppointmentView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "profile/login */ '../views/ProfileView.vue'),
  },
  {
    path: '/accountInfo',
    name: 'accountinfo',
    component: () => import(/* webpackChunkName: "accountinfo" */ '../views/UsersView.vue'),
  },
  {
    path: '/signUp',
    name: 'signup',
    component: () => import(/* webpackChunkName: "signup" */ '../views/SignupView.vue'),
  },
  {
    path: '/portfolio',
    name: 'portfolio',
    component: () => import(/* webpackChunkName: "about" */ '../views/PortfolioView.vue'),
  },
  {
    path: '/staff',
    name: 'staff',
    component: () => import(/* webpackChunkName: "about" */ '../views/StaffView.vue'),
  },
  {
    path: '/',
    name: 'home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/HomeView.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
