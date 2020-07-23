export const parse = (template) => {
  const fragment = document.createDocumentFragment();
  parseHTML(template)
    .forEach(node => {
      fragment.appendChild(node);
    });
  return fragment;
};

const parseHTML = (template) => {
  const div = document.createElement('div');
  div.innerHTML = template;
  return Array.from(div.childNodes);
};
