import TodoList from './todo-list.js';
import TodoSummary from './todo-summary.js';
import model from './model.js';

const controller = {
  addTodoItem: (item) => {
    model.addTodoItem(item)
  },
  removeTodoItem: (item) => {
    model.removeTodoItem(item)
  }
};

export const init = () => {
  const parentNode = document.querySelector('#app');

  TodoSummary.mount({
    parentNode
  });
  TodoList.mount({
    controller,
    parentNode
  });

  model.observe((data) => {
    TodoList.render(data)
    TodoSummary.render(data);
  });
};
