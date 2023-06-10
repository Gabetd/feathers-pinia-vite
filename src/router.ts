import  { createRouter, createWebHistory } from 'vue-router'
import  indexPage from './pages/app/index.vue'
import  mePage from './pages/app/index.vue'
import  remindersPage from './pages/app/index.vue'

const b = import.meta.env.VITE_BASE || ''

const routes = [{
  path: b + '/',
  name: "loginPage",
  component: indexPage,
},
{
  path: b + '/me',
  name: 'listUser',
  component: mePage,
  meta: { requiresAuth: true }
},
{
  path: "/reminders",
  name: "showReminders",
  component: remindersPage,
  meta: { requiresAuth: true }
}]

export const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE || ''),
  routes,
})

router.beforeEach(async (to, from) => {
  if (to..user) {
    authStore.loginRedirect = to
    return { path: '/login' }
  }
  
  const authStore = useAuthStore()

  const publicRoutes = ['/', '/login']
  const is404 = to.matched[0].name === 'NotFound'
  if (publicRoutes.includes(to.path) || is404) {
    return true
  }

  // for non-public routes, check auth and apply login redirect
  await authStore.getPromise()
  if (!authStore.user) {
    authStore.loginRedirect = to
    return { path: '/login' }
  }
  return true
})
