import {createSubject} from '../utils/observer.js';
import {assign} from '../utils/helper.js';

export const createModel = () => {
  const state = {
    data: {
      id: 0,
      todoList: [],
    },
    subject: createSubject()
  };

  const notify = () => {
    state.subject.notify(cloneData())
  };
  const cloneData = () => {
    return {todoList: [...state.data.todoList]}
  };
  const subscribe = observer => {
    state.subject.subscribe(observer);
    observer(cloneData())
  };
  const unsubscribe = observer => {
    state.subject.unsubscribe(observer)
  };
  const addTodoItem = item => {
    const {data} = state;
    const newTodo = {id: data.id++, item};

    assign(data, {
      todoList: [...data.todoList, newTodo]
    });
    notify();
  };
  const removeTodoItem = item => {
    const {data} = state;
    const filteredTodoList = data.todoList
      .filter(todoItem => todoItem !== item);

    assign(data, {
      todoList: filteredTodoList
    });
    notify();
  };

  return {
    subscribe,
    unsubscribe,
    addTodoItem,
    removeTodoItem
  }
};
