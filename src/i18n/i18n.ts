import { createI18n } from 'vue-i18n';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn'; // import locale
import { getCookie } from '@/utils/utils';
import chineseJson from '../lang/zh-cn.json';
import englishJson from '../lang/en.json';
let currentLang = getCookie('blueking_language') || 'zhCN';
if (currentLang === 'en') {
  currentLang = 'enUS';
  dayjs.locale('en');
} else {
  currentLang = 'zhCN';
  dayjs.locale('zh-cn');
}
const i18n = createI18n({
  locale: getCookie('blueking_language') || 'zh-cn',
  fallbackLocale: 'zh-cn', // 设置备用语言
  silentTranslationWarn: true,
  globalInjection: true,
  messages: {
    en: { ...englishJson },
    'zh-cn': { ...chineseJson },
  },
});
// window.i18n = i18n;
export default i18n;
