/*
 * @Description: 异常页面 入口。
 * 默认404页面，具体展示内容，根据 url 上 search参数中的  type 与msg 决定,如：
 * /exception.html?type=500&msg=test
 * 具体参看 https://magicbox.bk.tencent.com/static_api/v3/components_vue/2.0/example/index.html#/exception
 */


import { createApp } from 'vue';
import App from './pages/exception';
import store from '@/store';
import i18n from './i18n/i18n';
createApp(App)
  .use(store)
  .use(i18n)
  .mount('#app');


