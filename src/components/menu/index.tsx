import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import './menu.scss';

export default defineComponent({
  name: 'MenuLeft',
  setup() {
    const router = useRouter();
    const jumpPage = (page: string) => {
      router.push({ name: page });
    };
    return () => (
     <div class={'menu-left-list'}>
       <div onClick={() => jumpPage('dashboard')} class='cursor-pointer'>
         <i class='menu-icon pl30 pr15'>》</i>
         <span>总览</span>
       </div>
       <div onClick={() => jumpPage('dashboard')} class='cursor-pointer active-item'>
         <i class='menu-icon pl30 pr15'>》</i>
         <span>研发质量</span>
       </div>
     </div>
    );
  },
});
