export const html = (tagName, props = {}) => {
  return assignProps(document.createElement(tagName), props);
};

export const clone = (node, props) => {
  return assignProps(node.cloneNode(true), props);
};

const assignProps = (node, props) => {
  return Object.assign(node, props);
};

export const query = (parentNode, selector) => {
  return parentNode.querySelector(selector)
};
