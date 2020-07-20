export const patch = (fragmentDOM, actualDOM) => {
  
};

const eachUntil = (f, arr) => {
  arr.some((val, ...args) => {
    return f(val, ...args)
  })
};
