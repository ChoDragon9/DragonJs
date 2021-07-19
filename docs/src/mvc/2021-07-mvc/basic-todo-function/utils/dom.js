import {assign} from './helper.js'

export const html = (tagName, props = {}) => {
  return assign(document.createElement(tagName), props);
};

export const clone = (node, props) => {
  return assign(node.cloneNode(true), props);
};

export const query = (parentNode, selector) => {
  return parentNode.querySelector(selector)
};

export const events = (node, options) => {
  Object
    .entries(options)
    .forEach(([eventName, listener]) => {
      node.addEventListener(eventName, listener)
    })
};

export const append = (parentNode, childNode) => {
  parentNode.appendChild(childNode)
};
