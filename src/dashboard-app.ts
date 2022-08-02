/*
 * @Description: sdk-js 入口
 */
import { createApp } from 'vue';
import App from '@/pages/dashboard-comp';
export  function init(
  domId: string,
  uid: string,
  data?: {
    filter: object,
    isShowTools: boolean,
    waterMark: boolean,
    isFullScroll: boolean,
    isShowRefresh: boolean,
    isShowTimeRange: boolean,
    timeRange: boolean,
    apiPrefix: boolean,
  },
) {
  if (!domId || !uid) {
    return false;
  }
  const props = {
    uid,
    ...data,
  };
  createApp(App, props).mount(domId);
}


