// interface HTMLOptions {
//   events?: object
//   attrs?: object
// }
//
// type html = (
//   tagName: string,
//   children: string | HTMLElement[],
//   options?: HTMLOptions
// ) => HTMLElement

import {forEach} from './utils/forEach.js';

export const html = (tagName, children, options) => {
  const elem = document.createElement(tagName);
  appendChild(elem, children);
  appendOptions(elem, options);
  return elem;
};

const appendChild = (elem, children) => {
  if (Array.isArray(children)) {
    children.forEach((child) => {
      typeof child === 'function' ?
        child(elem) :
        elem.appendChild(child)
    })
  } else {
    elem.textContent = children
  }
};

const appendOptions = (elem, options) => {
  if (options) {
    const {attrs = {}, events = {}} = options;

    forEach(attrs, ([key, value]) => {
      elem.setAttribute(key, value)
    });
    forEach(events, ([key, fn]) => {
      elem.addEventListener(key, fn)
    });
  }
};
