import { defineComponent, Suspense, Transition, ref } from 'vue';
import { RouterView, useRouter } from 'vue-router';
import { UserModule } from '@modules/user';
export default defineComponent({
  setup() {
    const router = useRouter();
    const loading = ref(true);
    UserModule.setUserAsync().then(() => {
      // 如果没有创建空间，跳转到空间页面
      if (!UserModule.space) {
        router.push({ name: 'space' });
      }
    })
      .finally(() => {
        loading.value = false;
      });
    return () => {
      if (loading.value) {
        return  (
          <Loading/>
        );
      }
      return (
        <RouterView>
          {{
            default: ({ Component, route }: { Component: () => JSX.Element, route: any }) => (
              <Transition name={route.meta.transition || 'fade'} mode='out-in'>
                <Suspense>
                  {{
                    default: () => <Component key={route.name}/>,
                    fallback: () => <Loading/>,
                  }}
                </Suspense>
              </Transition>
            ),
          }}
        </RouterView>
      );
    };
  },
});
