import {parse} from './core/parse.js';
import {generate} from './core/generate.js';
import {patch} from './core/fragment-dom-20200725/patch.js';

const template = `{{text}}
  <input type="text" @input="onInput">
  <input type="text" :value="text">`;

const fns = {
  onInput: (event) => {
    state.setText(event.target.value);
  }
};

const fragmentAST = parse(template);
const render = generate(fragmentAST, fns);
const actualDOM = document.querySelector('#app');
const update = (state) => {
  const fragmentDOM = render(state);
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
