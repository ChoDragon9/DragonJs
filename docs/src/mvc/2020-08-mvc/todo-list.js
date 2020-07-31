import {clone, html, query} from './utils/dom.js';

const state = {
  input: null,
  list: null,
  controller: null,
};

const template = _ => html('div', {
  innerHTML: `
    <input type="text">
    <ul></ul>
  `
});

export default {
  mount: ({controller, parentNode}) => {
    const dom = template();

    state.controller = controller;
    state.input = query(dom, 'input[type=text]');
    state.list = query(dom, 'ul');

    state.input.addEventListener('keyup', (event) => {
      if (event.code === 'Enter') {
        controller.addTodoItem(event.target.value);
        event.target.value = '';
      }
    });

    parentNode.append(dom);
  },
  render: (model) => {
    const {todo} = model;
    const fragment = document.createDocumentFragment();
    const li = html('li');

    todo.forEach((item) => {
      const clonedLi = clone(li, {
        innerHTML: `${item} <button type="text">X</button>`
      });

      query(clonedLi, 'button')
        .addEventListener('click', () => {
          state.controller.removeTodoItem(item)
        });

      fragment.appendChild(clonedLi)
    });

    state.list.innerHTML = '';
    state.list.appendChild(fragment)
  },
}
