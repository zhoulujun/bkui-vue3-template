import App from './pages/main';
import store from './store';
import router from './router';
import { createApp } from 'vue';
import './style/index.scss';
import i18n from './i18n/i18n';
// import bkui from 'bkui-vue';
import 'bkui-vue/dist/style.css';
createApp(App)
  .use(router)
  .use(store)
  // .use(bkui)
  .use(i18n)
  .mount('#app');
