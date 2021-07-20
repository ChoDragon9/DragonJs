import Subject from '../utils/subject.js';

class Model extends Subject {
  constructor() {
    super();

    Object.assign(this, {
      state: {
        id: 0,
        todoList: [],
      },
    });

    this.addTodoItem('default item1');
    this.addTodoItem('default item2');
  }

  getState () {
    return {
      todoList: [...this.state.todoList]
    }
  }

  addTodoItem (text) {
    const newTodo = {
      id: this.state.id++,
      item: text
    };
    this.state.todoList = [...this.state.todoList, newTodo];
    this.notify();
  }

  removeTodoItem (item) {
    this.state.todoList = this.state.todoList
      .filter((todoItem) => {
        return !(todoItem.item === item.item && todoItem.id === item.id)
      });
    this.notify();
  }
}

export default Model
