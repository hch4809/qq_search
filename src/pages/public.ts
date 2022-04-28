/**
 * 防抖函数
 * @param func 执行函数
 * @param delay 延迟时间 ms
 * @param immediate 是否立即执行
 */
export function debounce(
  func: Function,
  delay: number,
  immediate: any = false
): Function {
  let timer: any;

  return function (this: unknown, ...args: any[]) {
    let that = this;
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(that, args);
    }, delay);
  };
}

// 防抖
// export const debounce = function (fn: any, delay: number = 500) {
//   let timer: any;
//   return function () {
//     clearTimeout(timer);
//     timer = setTimeout(function () {

//       fn.call(this, arguments);
//       clearTimeout(timer);
//     }, delay);
//   };
// };
