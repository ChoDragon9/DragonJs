export const createSubject = () => {
  const set = new Set();

  return {
    notify: (value) => {
      set.forEach(observer => observer(value))
    },
    observe: (observer) => {
      set.add(observer)
    }
  };
};
