import {parse} from './core/parse.js';

const template = `<div>
  <input type="text" @click="onClick">
</div>`;

const events = {
  onClick: (event) => {
    console.log(event.target.value)
  }
};

const fragmentAST = parse(template);

console.log(fragmentAST);
// const fragmentDOM = generate(fragmentAST, events)
// const actualDOM = document.querySelector('#app');

// patch(fragmentDOM, actualDOM);
