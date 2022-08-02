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
    redirect: '/exception',
  },
  {
    path: '/exception',
    name: 'exception',
    component: () => import('@/pages/exception'),
    meta: {
      parent: 'exception',
      isHideNav: true,
    },
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
