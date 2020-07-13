import {createObserver} from './observer.js';

export const createStore = ({state, mutation, actions}) => {
  const observer = createObserver();
  const innerState = ref(state);

  const commit = (mutationName, payload) => {
    const oldValue = innerState.value;
    const newValue = mutation[mutationName](oldValue, payload);

    innerState.value = newValue;
    detectMutation(oldValue, newValue);
  };
  const detectMutation = (oldValue, newValue) => {
    Object
      .keys(oldValue)
      .forEach((key) => {
        if (oldValue[key] !== newValue[key]) {
          observer.notify(key, newValue[key])
        }
      });
  };

  const context = {
    commit,
    get state () {
      return innerState.value;
    },
  };

  const dispatch = (actionName, payload) => {
    actions[actionName](context, payload);
  };

  return {
    dispatch,
    observe: observer.observe,
  }
};

const ref = (value) => ({value});
