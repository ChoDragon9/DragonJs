import {createSubject} from '../utils/observer.js';

class Model {
  constructor() {
    Object.assign(this, {
      data: {
        id: 0,
        todoList: [],
      },
      subject: createSubject()
    });

    this.addTodoItem('default item1');
    this.addTodoItem('default item2');
  }

  getData () {
    return {todoList: [...this.data.todoList]}
  };

  notify() {
    this.subject.notify()
  }

  subscribe (observer) {
    this.subject.subscribe(observer);
  }

  unsubscribe (observer) {
    this.subject.unsubscribe(observer)
  }

  addTodoItem (item) {
    const newTodo = {id: this.data.id++, item};
    this.data.todoList = [...this.data.todoList, newTodo];
    this.notify();
  }
  removeTodoItem (item) {
    this.data.todoList = this.data.todoList
      .filter((todoItem) => todoItem !== item);
    this.notify();
  }

  static create() {
    return new Model();
  }
}

export default Model
