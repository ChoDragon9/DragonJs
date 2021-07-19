import {clone, html, query} from '../utils/dom.js';

class View {
  constructor({model, controller}) {
    Object.assign(this, { model, controller });

    this.model.subscribe(() => {
      this.render()
    });
  }

  build() {
    const dom = View.template();

    Object.assign(this, {
      input: query(dom, 'input[type=text]'),
      button: query(dom, 'button'),
      list: query(dom, 'ol'),
      summary: query(dom, 'h2'),
    });

    this.bindEvent();
    this.render();

    return dom;
  }

  bindEvent () {
    this.button.addEventListener('click', () => {
      this.controller.addTodoItem(this.input.value);
      this.input.value = '';
    });
  }

  render () {
    this.renderTodoList();
    this.renderTodoSummary();
  }

  renderTodoList () {
    const {todoList} = this.model.getData();
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

  renderTodoSummary () {
    const {todoList} = this.model.getData();
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

  static create({model, controller}) {
    return new View({model, controller})
  }
}

export default View
