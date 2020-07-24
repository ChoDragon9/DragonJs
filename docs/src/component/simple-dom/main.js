import {parse} from './core/parse.js';
import {generate} from './core/generate.js';
import {patch} from './core/fragment-dom-20200725/patch.js';

const template = (state) => `${state.text}
  <input type="text" @input="onInput">
  <input type="text" value="${state.text}">`;

const fns = {
  onInput: (event) => {
    state.setText(event.target.value);
  }
};

const actualDOM = document.querySelector('#app');
const update = (state) => {
  const fragmentAST = parse(template(state));
  const fragmentDOM = generate(fragmentAST, fns);
  patch(fragmentDOM, actualDOM);
};

const state = {
  text: '',
  setText: (text) => {
    state.text = text;
    update(state);
  }
};

update(state);
