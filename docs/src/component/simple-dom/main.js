import {parse} from './core/parse.js';
import {generate} from './core/generate.js';
import {patch} from './core/fragment-dom-20200725/patch.js';

const template = (state) => {
  return `<div>
    <h1>Todo</h1>
    <input 
      type="text"
      @keyup="onKeyUp"
      @input="onInput"
      value="${state.text}"
    >
    <button type="button" @click="onClick">추가</button>
    <p>작성중: ${state.text}</p>
    <h2>Todo List</h2>
    <ol>
      ${state.todo.map(todo => `<li>${todo}</li>`).join('')}
    </ol>
  </div>`
};

const fns = {
  addTodo: () => {
    if (!state.text) {
      return;
    }
    state.setTodo(state.text);
    state.setText('');
  },
  onKeyUp: (event) => {
    if (event.key.toLowerCase() === 'enter') {
      fns.addTodo(state.text);
    }
  },
  onClick: event => fns.addTodo(),
  onInput: event => state.setText(event.target.value)
};

const actualDOM = document.querySelector('#app');
const update = (state) => {
  const fragmentAST = parse(template(state));
  const fragmentDOM = generate(fragmentAST, fns);
  patch(fragmentDOM, actualDOM);
};

const state = {
  text: '',
  todo: [],
  setText: (text) => {
    state.text = text;
    update(state);
  },
  setTodo: (todo) => {
    state.todo = [...state.todo, todo];
    update(state);
  },
};

update(state);
