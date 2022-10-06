import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Dashboard from '../views/Dashboard'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/planos',
    name: 'Planos',
    component: () => import('@/views/Planos.vue')
  },
  {
    path: '/loja',
    name: 'Loja',
    component: Dashboard
  },
  {
    path: '/usuarios',
    name: 'Usuarios',
    component: Dashboard
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (['Login', 'Planos'].includes(to.name) && store.getters.isLogged) {
    next({ name: 'Dashboard' })
    return
  }
  if (!['Login', 'Planos'].includes(to.name) && !store.getters.isLogged) {
    next({ name: 'Planos' })
    return
  }
  next()
})

export default router
