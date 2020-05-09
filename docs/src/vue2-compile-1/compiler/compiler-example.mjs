import {compiler} from './compiler.mjs';

const template = `<div>{{hello}} {{world}}</div>`;
const render = compiler(template);

const state = {
  hello: 'Hello',
  world: 'World!'
};
console.log(render(state));
// <div>Hello World!</div>
