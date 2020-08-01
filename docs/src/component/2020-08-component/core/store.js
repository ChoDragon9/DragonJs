import {createSubject} from './helper/observer.js';
import {mapValues} from './helper/map-values.js';

export const createStore = () => {
  const subject = createSubject();
  return {
    create: (state = {}) => {
      return mapValues(state, (value) => {
        return {
          get: () => value,
          set: (newValue, shouldNotify = true) => {
            value = newValue;
            shouldNotify && subject.notify()
          }
        }
      });
    },
    share: (store) => {
      store._subscribe(() => {
        subject.notify();
      })
    },
    _subscribe: subject.subscribe,
    _unsubscribe: subject.unsubscribe,
  }
};
