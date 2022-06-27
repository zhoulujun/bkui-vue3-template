import { defineComponent } from 'vue';
import { Exception } from 'bkui-vue';
import { useI18n } from 'vue-i18n';
export default defineComponent({
  setup() {
    const { t } = useI18n();
    return () => (
     <div>
       <Exception  class="exception-wrap-item" type="403">
           <span>{t('无业务权限')}</span>
           <div class='text-subtitle'>{t('你没有相应业务的访问权限，请前往申请相关业务权限')}</div>
           <div class='text-wrap'>
               <span class='text-btn'>{t('请联系管理员添加')}</span>
           </div>
       </Exception>
     </div>
    );
  },
});
