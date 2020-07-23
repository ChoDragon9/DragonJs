export const bindEvents = (fragmentDOM, events) => {
  fragmentDOM
    .querySelectorAll('[on-click]')
    .forEach((node) => {
      console.log(node)
    })
};
