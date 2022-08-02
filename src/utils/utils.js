/**
 * 原GEM项目utils复用函数
 */
import { cloneDeep } from 'lodash';
/**
 * 获取Cookie
 * @param {String} name
 */
export const getCookie = (name) => {
  const reg = new RegExp(`(^|)${name}=([^;]*)(;|$)`);
  const data = document.cookie.match(reg);
  if (data) {
    return unescape(data[2]);
  }
  return null;
};
/**
 * 深拷贝
 * @param {Object} obj
 */
export const deepClone = obj => cloneDeep(obj);

/**
 * 命名转换
 * @param {Object} data  数据源
 * @param {Boolean} flag 转换方向 default: false; false: snake_case命名转换为camelCase命名 true: camelCase命名转snake_case命名
 */
export const transformDataKey = (data = {}, flag = false) => {
  if (!['[object Array]', '[object Object]'].includes(Object.prototype.toString.call(data))) return data;
  const result = {};
  if (Array.isArray(data)) {
    return data.map(item => transformDataKey(item, flag));
  }
  Object.keys(data).forEach((key) => {
    const matchList = flag ? key.match(/([A-Z])/g) : key.match(/(_[a-zA-Z])/g);
    let newKey = key;
    const item = data[key];
    if (matchList) {
      matchList.forEach((set) => {
        if (flag) {
          newKey = newKey.replace(set, `_${set.toLocaleLowerCase()}`);
        } else {
          newKey = newKey.replace(set, set.replace('_', '').toLocaleUpperCase());
        }
      });
    }
    if (item && typeof item === 'object' && Object.keys(item).length) {
      result[newKey] = transformDataKey(item, flag);
    } else {
      result[newKey] = item;
    }
  });

  return result;
};

/**
 * 判断是否是对象
 *
 * @param {Object} obj 待判断的
 *
 * @return {boolean} 判断结果
 */
export const isObject = function (obj) {
  return obj !== null && typeof obj === 'object';
};
/**
 * 排序数组对象
 * 排序规则：1. 数字 => 2. 字母 => 3. 中文
 * @param {*} arr
 * @param {*} key
 */
export const sort = (arr, key) => {
  if (!Array.isArray(arr)) return;
  const reg = /^[0-9a-zA-Z]/;
  return arr.sort((pre, next) => {
    if (isObject(pre) && isObject(next) && key) {
      if (reg.test(pre[key]) && !reg.test(next[key])) {
        return -1;
      }
      if (!reg.test(pre[key]) && reg.test(next[key])) {
        return 1;
      }
      return pre[key].localeCompare(next[key]);
    }
    return `${pre}`.toString().localeCompare(`${pre}`);
  });
};

/**
 * 下载文件
 * @param url 资源地址
 * @param name 资源名称
 */
export const downFile = (url, name = '') => {
  const element = document.createElement('a');
  element.setAttribute('href', url);
  element.setAttribute('download', name);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

export const downJsonFile = (data, name) => {
  const blob = new Blob([JSON.stringify(data)]);
  downFile(URL.createObjectURL(blob), name);
};
