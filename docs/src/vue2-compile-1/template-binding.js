import {compiler} from './compiler/compiler.js';

const template = `<div>
  {{text}} Text
  <div>{{text}}</div>
</div>`;
const render = compiler(template);

const renderTemplate = (event) => {
  document
    .querySelector('#template')
    .innerHTML = render({text: event.target.value})
}

document
  .querySelector('input')
  .oninput = renderTemplate
