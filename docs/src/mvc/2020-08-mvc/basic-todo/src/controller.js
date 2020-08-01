import View from './view.js';
import Model from './model.js';
import {query} from '../utils/dom.js';

class Controller {
  constructor() {
    const parentNode = query(document, '#app');
    const view = View.mount({parentNode, controller: this});
    const model = Model.create();

    Object.assign(this, {view, model});

    this.model.subscribe(data => {
      this.view.render(data);
    })
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
