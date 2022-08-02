import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { getCookie } from '@/utils/utils';
import { Message } from 'bkui-vue';
import  Qs from 'qs';

const pendingRequest = new Map();

function generateReqKey(config: AxiosRequestConfig) {
  const { method, url, params, data } = config;
  return [method, url, Qs.stringify(params), Qs.stringify(data)].join('&');
}

function addPendingRequest(config: AxiosRequestConfig) {
  const requestKey = generateReqKey(config);
  // eslint-disable-next-line no-param-reassign
  config.cancelToken = config.cancelToken
      || new axios.CancelToken((cancel) => {
        if (!pendingRequest.has(requestKey)) {
          pendingRequest.set(requestKey, cancel);
        }
      });
}

function removePendingRequest(config: AxiosRequestConfig) {
  const requestKey = generateReqKey(config);
  if (pendingRequest.has(requestKey)) {
    const cancel = pendingRequest.get(requestKey);
    cancel(requestKey);
    pendingRequest.delete(requestKey);
  }
}

const http = axios.create({
  timeout: 1000 * 120,
  withCredentials: true,
  xsrfCookieName: 'X-CSRFToken',
  baseURL: window.PROJECT_CONFIG?.SITE_URL || '',
});
const executeError = (error: AxiosError) => {
  let isShowNormalError = true;
  const hideNormalError = (status = false) => isShowNormalError = status;
  const timer = setTimeout(() => {
    if (isShowNormalError) {
      Message(error.message);
    }
    clearTimeout(timer);
  }, 100);
  return { ...error, hideNormalError };
};
http.interceptors.request.use((_config: AxiosRequestConfig) => {
  const config: AxiosRequestConfig = _config;
  if (!config) {
    return  null;
  }
  removePendingRequest(config); // 检查是否存在重复请求，若存在则取消已发的请求
  addPendingRequest(config); // 把当前请求添加到pendingRequest对象中
  if (!config.headers) {
    config.headers = {};
  }
  if (!['HEAD', 'OPTIONS', 'TRACE'].includes(`${config.method}`.toUpperCase())) {
    config.headers['X-CSRFToken'] = getCookie(window.csrf_cookie_name) || '';
  }
  config.headers['X-Requested-With'] = 'XMLHttpRequest';
  // config.url = window.PROJECT_CONFIG.SITE_URL + _config.url;
  return config;
}, (error: AxiosError) => {
  const errorInfo = executeError(error);
  return Promise.reject(errorInfo);
});

function login() {
  // window.location.href = response.data.login_url;
  // pending的promise，中止promise链
  new Promise(() => {});
}
http.interceptors.response.use((res: AxiosResponse) => {
  removePendingRequest(res.config); // 从pendingRequest对象中移除请求
  if (res.status === 200) {
    const response = res.data || {};
    switch (response.code) {
      case 200:
        if (!response.result) {
          const errorInfo = executeError(response);
          return Promise.reject(errorInfo);
        }
        return Promise.resolve(response.data);
      case 401:
        return  login();
      default:
      {
        const errorInfo = executeError(response);
        return Promise.reject(errorInfo);
      }
    }
  }
}, (error) => {
  if (error) {
    // removePendingRequest(error.config); // 从pendingRequest对象中移除请求
    const { response } = error;
    const { url = '' } = response?.config || {};
    const { status } = error.response;
    if (axios.isCancel(error)) {
      console.log(`已取消的重复请求：${url}`);
      return Promise.reject(null);
    }
    let msg = '';
    switch (status) {
      case 500:
        msg = '服务端出错了';
        break;
      case 502:
        msg = '网关超时了';
        break;
      case 400:
        msg = '请求出错了！';
        break;
      case 401:
        return login(); // pending的promise，中止promise链
      case 404:
        msg = '请求的资源不存在';
        break;
      default:
        msg = '请求出错了';
        break;
    }
    // Object.assign(error, );
    const errorInfo = executeError({ message: `${msg}:\n${url}`, status } as any);
    return Promise.reject(errorInfo);
  }
});

export default http;
