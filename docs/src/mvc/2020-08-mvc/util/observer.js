export const createSubject = () => {
  const set = new Set();

  return {
    notify: (value) => {
      set.forEach(fn => fn(value))
    },
    observe: (fn) => {
      set.add(fn)
    }
  };
};
