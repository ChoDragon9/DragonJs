import View from './view.js';
import Model from './model.js';
import {query} from '../utils/dom.js';

class Controller {
  constructor() {
    const model = Model.create();
    const view = View.create({
      model,
      controller: this,
    });

    Object.assign(this, {view, model});

    const parentNode = query(document, '#app');
    parentNode.appendChild(view.build())
  }

  addTodoItem (item) {
    this.model.addTodoItem(item)
  }

  removeTodoItem (item) {
    this.model.removeTodoItem(item)
  }

  static create () {
    return new Controller();
  }
}

export default Controller
