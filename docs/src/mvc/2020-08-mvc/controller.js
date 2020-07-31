import TodoList from './todo-list.js';
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

  TodoList.mount({
    controller,
    parentNode
  });

  model.observe((todo) => {
    TodoList.render(todo)
  });
};
