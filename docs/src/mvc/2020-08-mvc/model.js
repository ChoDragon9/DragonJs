import {createSubject} from './util/observer.js';

const data = {
  todo: []
};
const subject = createSubject();
const notify = () => {
  subject.notify({
    todo: [...data.todo]
  })
};

export default {
  observe: subject.observe,

  addTodoItem: (item) => {
    data.todo = [...data.todo, item];
    notify();
  },
  removeTodoItem: (item) => {
    data.todo = data.todo.filter((todoItem) => todoItem !== item);
    notify();
  },
}

// model.observe((todo) => {
//   console.log(todo)
// });
//
// model.addTodoItem('1. 책읽기');
// model.addTodoItem('2. 영화보기');
// model.addTodoItem('3. 요리하기');
// model.removeTodoItem('1. 책읽기');

