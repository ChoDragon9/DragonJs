import {clone, html, query} from '../utils/dom.js';

class View {
  constructor(model) {
    Object.assign(this, {model});

    this.model.subscribe(this);
  }

  build() {
    const dom = View.template();

    Object.assign(this, {
      input: query(dom, 'input[type=text]'),
      button: query(dom, 'button'),
      list: query(dom, 'ol'),
      summary: query(dom, 'h2'),
    });

    this.render();
    this.bindEvent();
    return dom;
  }

  render () {
    this.renderTodoList();
    this.renderTodoSummary();
  }

  renderTodoList () {
    const {todoList} = this.model.getState();
    const li = html('li');
    const fragment = todoList
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
      .reduce((fragment, clonedLi) => {
        fragment.appendChild(clonedLi);
        return fragment;
      }, document.createDocumentFragment());

    this.list.innerHTML = '';
    this.list.appendChild(fragment);
  }

  renderTodoSummary () {
    const {todoList} = this.model.getState();
    this.summary.innerHTML = `TODO: ${todoList.length}`
  }

  bindEvent () {
    this.button.addEventListener('click', () => {
      this.controller.addTodoItem(this.input.value);
      this.input.value = '';
    });
  }

  update() {
    this.render();
  }

  setController (controller) {
    Object.assign(this, {controller});
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
}

export default View
