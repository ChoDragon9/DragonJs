import {assign} from '../utils/helper.js'
import {append, clone, events, html, query} from '../utils/dom.js';

const template = () => html('div', {
  innerHTML: `
    <h2></h2>
    <input type="text">
    <button type="button">Add</button>
    <ol></ol>
  `
});
const liTemplate = todo => `
  <span id="${todo.id}">${todo.item}</span>
  <button type="text">X</button>
`;

export const createView = ({controller, parentNode}) => {
  const dom = template();
  const state = {
    input: query(dom, 'input[type=text]'),
    button: query(dom, 'button'),
    list: query(dom, 'ol'),
    summary: query(dom, 'h2'),
  };

  const render = (model) => {
    renderTodoList(model);
    renderTodoSummary(model);
  };
  const renderTodoList = (model) => {
    const {todoList} = model;
    const fragment = document.createDocumentFragment();
    const li = html('li');

    todoList
      .map((todo) => {
        const clonedLi = clone(li, {
          innerHTML: liTemplate(todo)
        });

        events(query(clonedLi, 'button'), {
          click: () => {
            controller.removeTodoItem(todo)
          }
        });

        return clonedLi;
      })
      .forEach((clonedLi) => {
        append(fragment, clonedLi);
      });

    assign(state.list, {innerHTML: ''});
    append(state.list, fragment);
  };
  const renderTodoSummary = (model) => {
    const {todoList} = model;
    assign(state.summary, {
      innerHTML: `TODO: ${todoList.length}`
    });
  };

  const mount = () => {
    append(parentNode, dom);
    events(state.button, {
      click: () => {
        controller.addTodoItem(state.input.value);
        state.input.value = '';
      }
    });
  };

  mount();

  return {render}
};
