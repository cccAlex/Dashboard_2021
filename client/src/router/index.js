import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Dashboard from '../components/Dashboard.vue'
import DashboardHome from '../views/Home.vue'
import Profile from '../views/Profile.vue'
import Error from '../components/Error.vue'
import Widgets from '../components/Widgets.vue'
import store from '../config/store'

const routes = [
  {
    path: '/',
    beforeEnter: (to, from, next) => {
      if (store.state.token == null) {
        next('/login')
      } else {
        next('/dashboard')
      }
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if (store.state.token == null) {
        next()
      } else {
        next('/dashboard')
      }
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    beforeEnter: (to, from, next) => {
      if (store.state.token == null) {
        next()
      } else {
        next('/dashboard')
      }
    },
  },
  {
    path: '/home',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter: (to, from, next) => {
      if (store.state.token == null) {
          next('/login')
      } else {
          next()
      }
    },
    redirect: '/dashboard',
    children: [
      { path: '/dashboard', name: 'DashboardHome', component: DashboardHome, beforeEnter: (to, from, next) => {
        if (store.state.token == null) {
            next('/login')
        } else {
            next()
        }
      },},
      { path: '/profile', name: 'Profile', component: Profile, beforeEnter: (to, from, next) => {
        if (store.state.token == null) {
            next('/login')
        } else {
            next()
        }
      },},
      { path: '/widgets', name: 'Widgets', component: Widgets, beforeEnter: (to, from, next) => {
        if (store.state.token == null) {
            next('/login')
        } else {
            next()
        }
      },}
    ]
  },
  {
    path: '/404-page-not-found',
    component: Error
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404-page-not-found'
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
