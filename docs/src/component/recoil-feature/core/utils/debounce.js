export const debounce = (callback, ms = 100) => {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args)
    }, ms)
  }
};
