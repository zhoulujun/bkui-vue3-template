import {
  createRouter,
  RouteRecordRaw,
  NavigationGuardNext,
  createWebHashHistory,
  RouteLocationNormalized,
} from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/pages/dashboard/index'),
  },
  {
    path: '/efficiency',
    name: 'efficiency',
    component: () => import('@/pages/efficiency/index'),
  },
  {
    path: '/member',
    name: 'member',
    component: () => import('@/pages/member/index'),
  },
  {
    path: '/quality',
    name: 'quality',
    component: () => import('@/pages/quality/index'),
  },
  {
    path: '/setting',
    name: 'setting',
    component: () => import('@/pages/setting/index'),
  },
  {
    path: '/exception',
    name: 'exception',
    component: () => import('@/pages/exception'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@/pages/403'),
  },


];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  next();
});

export default router;
