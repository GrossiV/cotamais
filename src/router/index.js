import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated } from '../auth/auth'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
      meta: { requiresAuth: false }
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignupView.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
      meta: { requiresAuth: true }
    }
  ]
})
router.beforeEach((to) => {
  // instead of having to check every route record with
  // to.matched.some(record => record.meta.requiresAuth)
  if (to.meta.requiresAuth && !isAuthenticated()) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    return {
      name: 'login',
      // save the location we were at to come back later
      query: { redirect: to.fullPath }
    }
  }
})

export default router
