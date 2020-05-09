import {compiler} from './compiler/compiler.js';

const template = `<div>
  {{hello}} {{world}}
  <div>{{text}}</div>
</div>`;
const render = compiler(template);

const state = {
  hello: 'Hello',
  world: 'World!',
  text: 'My Text'
};
document
  .querySelector('#template')
  .innerHTML = render(state)
