export const mount = (selector, component) => {
  component(document.querySelector(selector));
};
