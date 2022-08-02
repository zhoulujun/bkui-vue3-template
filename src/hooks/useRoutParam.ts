import { RouteParams, LocationQueryRaw } from 'vue-router';
import { computed, reactive } from 'vue';
import router from '@/router/index';


const routeData = reactive<{params: RouteParams, query: LocationQueryRaw}>({ params: {}, query: {} });
router.afterEach((route) => {
  routeData.params = route.params;
  routeData.query = route.query;
});

export  function useRouteParam() {
  return computed(() => routeData.params);
}
export function useRouteQuery() {
  return computed(() => routeData.query);
}


