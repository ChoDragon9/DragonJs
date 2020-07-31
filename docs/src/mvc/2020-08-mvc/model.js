import {createSubject} from './utils/observer.js';

const data = {
  todo: []
};
const subject = createSubject();
const notify = () => {
  subject.notify(cloneData())
};
const cloneData = () => ({
  todo: [...data.todo]
});

export default {
  observe: (observer) => {
    subject.observe(observer);
    observer(cloneData())
  },

  addTodoItem: (item) => {
    data.todo = [...data.todo, item];
    notify();
  },
  removeTodoItem: (item) => {
    data.todo = data.todo.filter((todoItem) => todoItem !== item);
    notify();
  },
}
