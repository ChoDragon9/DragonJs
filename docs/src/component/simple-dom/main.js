import {parse} from './core/parse.js';
import {patch} from '../fragment-dom/core/patch.js';
import {generate} from './core/generate.js';

const template = `<div>
  <input type="text" @input="onInput">
  <input type="text" @input="onInput">
</div>`;

const fns = {
  onInput: (event) => {
    console.log(event.target.value)
  }
};

const state = {};

const fragmentAST = parse(template);
const render = generate(fragmentAST, fns);
const fragmentDOM = render(state);
const actualDOM = document.querySelector('#app');

patch(fragmentDOM, actualDOM);
