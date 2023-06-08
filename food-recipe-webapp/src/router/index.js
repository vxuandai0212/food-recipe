import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

Vue.use(Router)

import Layout from '@/layout'

import ad from '@/router/modules/ad'
import dashboard from '@/router/modules/dashboard'
import event from '@/router/modules/event'
import ftCategory from '@/router/modules/ftCategory'
import ftPost from '@/router/modules/ftPost'
import ingredient from '@/router/modules/ingredient'
import nutrition from '@/router/modules/nutrition'
import recipe from '@/router/modules/recipe'
import storage from '@/router/modules/storage'

import VueRouteMiddleware from 'vue-route-middleware'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/auth/login'),
    hidden: true
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/403',
    component: () => import('@/views/error-page/403'),
    hidden: true
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // 404 page must be placed at the end !!!
  {
    path: '/',
    component: Layout,
    meta: {
      middleware: (from, to, next) => {
        if (store.state.user.role === 'admin') {
          next('/dashboard')
        } else {
          next('/403')
        }
      }
    }
  },
  ad,
  dashboard,
  event,
  ftCategory,
  ftPost,
  ingredient,
  nutrition,
  recipe,
  storage,
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  base: process.env.VUE_APP_PUBLIC_PATH,
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
router.beforeEach(VueRouteMiddleware())
router.beforeEach((to, from, next) => {
  let lastRoute = null;
  if (from.name) {
    lastRoute = from;
  }
  store.dispatch('app/setLastRoute', lastRoute);
  next();
})
export default router
