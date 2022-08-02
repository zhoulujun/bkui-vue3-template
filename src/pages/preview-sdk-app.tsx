import { defineComponent } from 'vue';
import { Exception } from 'bkui-vue';
export default defineComponent({
  setup() {
    return () => (
        <div>
          <Exception  class="exception-wrap-item" type="403">
            <span>无业务权限</span>
            <div class='text-subtitle'>你没有相应业务的访问权限，请前往申请相关业务权限</div>
            <div class='text-wrap'>
              <span class='text-btn'>请联系管理员添加</span>
            </div>
          </Exception>
        </div>
    );
  },
});
