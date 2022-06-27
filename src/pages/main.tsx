import { defineComponent } from 'vue';
import {  useRoute } from 'vue-router';
import Navigation from '@/components/navigation';
import Menu from '@/components/menu'
export default defineComponent({
  name: 'HomePage',
  setup() {
    const route = useRoute();
    let { isHideNav } = route.meta;
    const { space_uid } = route.params;
    const routeClass = () => {
      if (isHideNav) {
        return 'full-page';
      }
      return 'flex-1';
    };
    return () => (
      <div class='full-height flex-column'>
        <Navigation/>
        <div class='flex-row flex-1 '>
          <Menu/>
          <router-view key={space_uid}  class='flex-1 full-height'/>
        </div>

      </div>
    );
  },
});
