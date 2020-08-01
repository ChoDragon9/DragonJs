import {createSubject} from '../utils/observer.js';

class Model {
  constructor() {
    Object.assign(this, {
      data: {
        id: 0,
        todoList: [],
      },
      subject: createSubject()
    })
  }
  get cloneData () {
    return {todoList: [...this.data.todoList]}
  };

  notify() {
    this.subject.notify(this.cloneData)
  }
  subscribe (observer) {
    this.subject.subscribe(observer);
    observer(this.cloneData)
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
