export const addEvent = (methods, methodName) => event => {
  methods[methodName].call(methods, event)
};

export const getElem = (selector, parent = document) => {
  return parent.querySelectorAll(selector)
};

export const getAttr = (elem, attr) => elem.getAttribute(attr);
