import {clone, html, query} from '../utils/dom.js';

class View {
  constructor({controller, parentNode}) {
    const dom = View.template();
    Object.assign(this, {
      controller,
      input: query(dom, 'input[type=text]'),
      button: query(dom, 'button'),
      list: query(dom, 'ol'),
      summary: query(dom, 'h2'),
    });

    parentNode.appendChild(dom);
    this.bindEvent();
  }
  bindEvent () {
    this.button.addEventListener('click', () => {
      this.controller.addTodoItem(this.input.value);
      this.input.value = '';
    });
  }
  render (model) {
    this.renderTodoList(model);
    this.renderTodoSummary(model);
  }
  renderTodoList (model) {
    const {todoList} = model;
    const fragment = document.createDocumentFragment();
    const li = html('li');

    todoList
      .map((todo) => {
        const clonedLi = clone(li, {
          innerHTML: View.liTemplate(todo)
        });
        query(clonedLi, 'button')
          .addEventListener('click', () => {
            this.controller.removeTodoItem(todo)
          });

        return clonedLi;
      })
      .forEach((clonedLi) => {
        fragment.appendChild(clonedLi)
      });

    this.list.innerHTML = '';
    this.list.appendChild(fragment);
  }
  renderTodoSummary (model) {
    const {todoList} = model;
    this.summary.innerHTML = `TODO: ${todoList.length}`
  }
  static template () {
    return html('div', {
      innerHTML: `
        <h2></h2>
        <input type="text">
        <button type="button">Add</button>
        <ol></ol>
      `
    })
  }
  static liTemplate (todo) {
    return `
      <span id="${todo.id}">${todo.item}</span>
      <button type="text">X</button>
    `
  }
  static mount({controller, parentNode}) {
    return new View({controller, parentNode})
  }
}

export default View
