import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import EditNote from '../views/EditNote.vue';
import User from '../components/User.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path:'/note/:id',
    name:'Edit Note',
    component:EditNote
  },
  {
    path:'/user/:id',
    name:'User',
    component:User,
  },
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
