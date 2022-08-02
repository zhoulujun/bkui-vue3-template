/*
 * @Description: 页面预览入口
 */

import { createApp } from 'vue';
import store from './store';
import router from './router';
import './style/index.scss';
import i18n from './i18n/i18n';
import App from './pages/preview';

window.bkVisionApp = createApp(App)
  .use(router)
  .use(store)
  .use(i18n)
  .mount('#app');
