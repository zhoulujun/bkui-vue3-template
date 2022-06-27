/**
 * 原GEM项目utils复用函数
 */


/**
 * 获取Cookie
 * @param {String} name
 */
export const getCookie = (name: string) => {
  const reg = new RegExp(`(^|)${name}=([^;]*)(;|$)`);
  const data = document.cookie.match(reg);
  if (data) {
    return unescape(data[2]);
  }
  return null;
};

/**
 * 判断是否是对象
 *
 * @param {Object} obj 待判断的
 *
 * @return {boolean} 判断结果
 */
export const isObject = function (obj: any) {
  return obj !== null && typeof obj === 'object';
};
/**
 * 排序数组对象
 * 排序规则：1. 数字 => 2. 字母 => 3. 中文
 * @param {*} arr
 * @param {*} key
 */
export const sort = (arr: any[], key: any) => {
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
export const downFile = (url: string, name = '') => {
  const element = document.createElement('a');
  element.setAttribute('href', url);
  element.setAttribute('download', name);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

export const downJsonFile = (data: any, name: string) => {
  const blob = new Blob([JSON.stringify(data)]);
  downFile(URL.createObjectURL(blob), name);
};
/**
 *
 * @param accept 接收的文件类型
 * @param type 读取文件的方式
 * @param func 将读取的数据进行操作的函数
 */
type readType= 'text'|'arrayBuffer'|'binaryString'| 'dataUrl';
export const importFile = (func: (data: any) => any, accept = '.json', type: readType = 'text') => {
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', accept);
  input.style.display = 'none';
  document.body.appendChild(input);
  input.click();
  input.addEventListener('change',  (e) => {
    // @ts-ignore
    const { files } = e.target;
    if (!files.length) return;
    const reader = new FileReader();
    reader.onload = () => {
      // 当读取完成时，内容只在`reader.result`中
      const data = reader.result;
      func(data);
      document.body.removeChild(input);
    };
    switch (type) {
      case 'text':{
        reader.readAsText(files[0]);
        break;
      }
      case 'arrayBuffer':{
        reader.readAsArrayBuffer(files[0]);
        break;
      }
      case 'binaryString':{
        reader.readAsBinaryString(files[0]);
        break;
      }
      case 'dataUrl':{
        reader.readAsDataURL(files[0]);
        break;
      }
      default:{
        reader.readAsText(files[0]);
        break;
      }
    }
  });
};
