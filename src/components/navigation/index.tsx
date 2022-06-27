import { defineComponent, computed, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import classnames from 'classnames';
import { createRouteConfig } from '@/router/router-config';
import { UserModule } from '@/store/modules/user';
import './index.scss';

const routeList = createRouteConfig();


export default defineComponent({
  name: 'NavigationTop',
  setup() {
    const router = useRouter();
    const route = useRoute();
    const navActive = ref('');
    const activeSpace = computed(() => UserModule.space?.uid || '');
    const user = computed(() => UserModule.user);
    const handleHeaderMenuClick = (id: string, name: string): void => {
      if (route.name !== name) {
        router.push({ name });
        navActive.value = name;
      }
    };
    const goHome = (): void => {
      router.push({name:'dashboard'});
    };
    return {
      navActive,
      activeSpace,
      user,
      goHome,
      handleHeaderMenuClick,
    };
  },
  render() {
    return (
      <div class='bv-navigation flex-row align-items-center justify-content-between'>
        <div class='flex-row align-items-center'>
          <div class='project-icon  flex-row align-items-center cursor-pointer'>
            <i class='bk-vision-icon v-fsux_tubiao_qipaotu ml15 mr10' style={{ fontSize: '30px' }}
               onClick={this.goHome}/>
            <div>蓝鲸度量</div>
          </div>
          <ul
            class='bv-header-list flex-row flex-row flex-grow-1  full-height align-items-center justify-content-center'>
            {routeList.map(({ id, route, name }) => (
              <li
                key={id}
                class={classnames(['nav-item', { 'item-active': this.$route.path.includes(route) }])}
                onClick={() => this.handleHeaderMenuClick(id, route)}
              >
                {this.$t(name)}
              </li>
            ))}
          </ul>
        </div>

        <div class='flex-row align-items-center tool'>
          <i class='bk-vision-icon mr25 v-bangzhu'/>
          <div class='user flex-row align-items-center mr25'>
            <span class='text'>{this.user?.username}</span>
          </div>
        </div>
      </div>);
  },
});
