import {createObserver} from './observer.js';

export const atom = (state) => {
  const KEY = 'atom';
  const observer = createObserver();
  const innerState = ref(state);

  return {
    get: () => innerState.value,
    set: (state) => {
      innerState.value = state;
      observer.notify(KEY)
    },
    observe: (subscriber) => {
      observer.observe(KEY, subscriber);
    }
  }
};

export const useAtom = (atom) => [atom.get(), atom.set];

export const observeAtoms = (atomsObj, subscriber) => {
  const debouncedSubscriber = debounce(subscriber, 1000 / 60);
  Object
    .values(atomsObj)
    .forEach((atom) => {
      atom.observe(debouncedSubscriber)
    })
};

const ref = (value) => ({value});
const debounce = (callback, ms = 100) => {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args)
    }, ms)
  }
};
