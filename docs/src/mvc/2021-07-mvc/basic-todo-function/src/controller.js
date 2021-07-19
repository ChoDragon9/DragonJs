import {createView} from './view.js';
import {createModel} from './model.js';
import {query} from '../utils/dom.js';

export const createController = () => {
  const model = createModel();
  const controller = {
    addTodoItem: item => {
      model.addTodoItem(item)
    },
    removeTodoItem: item => {
      model.removeTodoItem(item)
    }
  };
  const view = createView({controller, model});

  const parentNode = query(document, '#app');
  parentNode.appendChild(view.build())
};
