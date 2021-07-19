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

export const createView = ({controller, model}) => {
  const state = {
    input: null,
    button: null,
    list: null,
    summary: null,
  };

  const render = () => {
    renderTodoList();
    renderTodoSummary();
  };
  const renderTodoList = () => {
    const {todoList} = model.getData();
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
  const renderTodoSummary = () => {
    const {todoList} = model.getData();
    assign(state.summary, {
      innerHTML: `TODO: ${todoList.length}`
    });
  };

  const build = () => {
    const dom = template();

    assign(state, {
      input: query(dom, 'input[type=text]'),
      button: query(dom, 'button'),
      list: query(dom, 'ol'),
      summary: query(dom, 'h2'),
    });

    events(state.button, {
      click: () => {
        controller.addTodoItem(state.input.value);
        state.input.value = '';
      }
    });

    render();

    return dom;
  };

  model.subscribe(() => {
    render();
  });

  return {render, build}
};
