/**
 * @description
 * @author andyzhou
 * @create andyzhou
 * @update 2021/5/6 by andyzhou
 */
/**
 * 判断某个原生DOM元素是否不在屏幕可见区内
 * @param {*} el 原生DOM元素
 */
const isElementNotInViewport = function (el: Element) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= (window.innerHeight || document.documentElement.clientHeight)
    || rect.bottom <= 0
  );
};
export default isElementNotInViewport;
