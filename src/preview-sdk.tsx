import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import i18n from './i18n/i18n';
import { createApp } from 'vue';
import store from './store';
import App from '@/pages/main';
import './style/index.scss';
const routes: RouteRecordRaw[] = [
  {
    path: '/sdk-vue',
    name: 'sdkVue',
    component: () => import(/* webpackChunkName: "SdkVue" */ './pages/preview-sdk-vue'),
  },
  {
    path: '/sdk-app',
    name: 'sdkApp',
    component: () => import(/* webpackChunkName: "SdkApp" */ './pages/preview-sdk-app'),
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
window.bkVisionApp = createApp(App)
  .use(router)
  .use(store)
  .use(i18n)
  .mount('#app');
