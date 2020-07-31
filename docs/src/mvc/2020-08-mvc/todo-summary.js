import {html, query} from './utils/dom.js';

const state = {
  summary: null,
};

const template = _ => html('div', {
  innerHTML: `<h2></h2>`
});

export default {
  mount: ({parentNode}) => {
    const dom = template();
    state.summary = query(dom, 'h2');
    parentNode.append(dom);
  },
  render: model => {
    const {todo} = model;
    state.summary.innerHTML = `TODO: ${todo.length}`
  },
}
