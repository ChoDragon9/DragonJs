export const createObserver = () => {
  const map = new Map();

  return {
    notify: createNotify(map),
    observe: createObserve(map)
  };
};

const createNotify = (map) => (key, value) => {
  const fns = map.get(key);
  fns.forEach(fn => fn(value))
};

const createObserve = (map) => (key, fn) => {
  map.has(key) || map.set(key, new Set());

  const observers = map.get(key);
  observers.add(fn);
};
