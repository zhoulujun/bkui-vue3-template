/**
 * 全局对象声明
 */

// import { Router } from 'vue-router';

declare global {
  interface Window {
    csrf_cookie_name: string,
    graph_watermark: boolean;
    user_name: string;
    space_uid: string
    bkVisionApp: any
    VISION_AJAX_URL_PREFIX: string,
  }
}
// declare module '@vue/runtime-core' {
//   interface ComponentCustomProperties {
//     $router: Router
//   }
// }

export {}; // 必须保留
