import {html, query} from './util/dom.js';

const state = {
  text: null,
};

const template = () => {
  return html('div', {
    innerHTML: `<h2></h2>`
  });
};

export default {
  mount: ({parentNode}) => {
    const dom = template();
    parentNode.append(dom);
    state.text = query(dom, 'h2');
  },
  render: (model) => {
    const {todo} = model;
    state.text.innerHTML = `TODO: ${todo.length}`
  },
}
