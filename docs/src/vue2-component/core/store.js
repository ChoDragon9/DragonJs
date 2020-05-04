export const ALL = '*';

export const createStore = (state = {}) => {
  const store = new Map();
  const subscriber = new Map();
  const set = mutation({store, subscriber});

  setDefaultState({state, set});

  return {
    set,
    delete: remove({store, subscriber}),
    get: getter({store}),
    watch: watch({subscriber}),
    watchAll: watchAll({subscriber}),
  }
};

const setDefaultState = ({state, set}) => {
  Object.entries(state).forEach(([key, value]) => set(key, value))
};

const mutation = ({store, subscriber}) => (key, value, noNotify = true) => {
  store.set(key, value);
  noNotify && notify({subscriber, store, key})
};

const remove = ({store, subscriber}) => key => {
  store.delete(key);
  notify({subscriber, store, key})
};

const notify = ({subscriber, key, store}) => {
  const data = store.get(key);
  if (subscriber.has(key)) {
    for (const listener of subscriber.get(key)) {
      listener(data)
    }
  }
  broadCast({subscriber, key, data})
};

const broadCast = ({subscriber, key, data}) => {
  if (subscriber.has(ALL)) {
    for (const listener of subscriber.get(ALL)) {
      listener({key, data})
    }
  }
};

const getter = ({store}) => key => store.get(key);

const watch = ({subscriber}) => (key, listener) => {
  let listeners;
  if (subscriber.has(key)) {
    listeners = subscriber.get(key)
  } else {
    listeners = []
  }
  listeners.push(listener);
  subscriber.set(key, listeners)
};

const watchAll = ({subscriber}) => {
  const watcher = watch({subscriber});
  return listener => {
    watcher(ALL, listener)
  }
};
