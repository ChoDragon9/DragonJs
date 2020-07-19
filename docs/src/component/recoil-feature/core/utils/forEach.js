export const forEach = (obj, fn) => {
  Object
    .entries(obj)
    .forEach(fn)
};
