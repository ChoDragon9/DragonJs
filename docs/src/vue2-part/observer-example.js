const obj = {};
Observer(obj, 'counter', (newValue, oldValue) => {
  console.log('LOG:', newValue, oldValue)
});

obj.counter = 0;
obj.counter = 1;

// LOG: 0 undefined
// LOG: 1 0
