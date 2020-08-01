import {createView} from './view.js';
import {createModel} from './model.js';
import {query} from '../utils/dom.js';

export const createController = () => {
  const parentNode = query(document, '#app');
  const model = createModel();
  const controller = {
    addTodoItem: item => {
      model.addTodoItem(item)
    },
    removeTodoItem: item => {
      model.removeTodoItem(item)
    }
  };
  const view = createView({parentNode, controller});

  model.subscribe(data => {
    view.render(data);
  })
};
