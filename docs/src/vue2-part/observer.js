const Observer = (obj, property, callback) => {
  let value = obj[property];

  Object.defineProperty(
    obj,
    property,
    {
      configurable: true,
      enumerable: true,
      set: (newValue) => {
        callback(newValue, value);
        value = newValue;
      },
      get: () => value
    }
  );
};
