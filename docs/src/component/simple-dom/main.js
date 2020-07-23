import {patch} from './core/patch.js';
import {parse} from './core/parse.js';
import {bindEvents} from './core/bind-events.js';

const template = `<div>
  <h1>Heading1</h1>
  <h2>Heading2</h2>
  <input type="text" onclick="onClick">
</div>`;
const events = {
  onClick: (event) => {
    console.log(event.target.value)
  }
};

const fragmentDOM = parse(template);
const actualDOM = document.querySelector('#app');

bindEvents(fragmentDOM, events);
patch(fragmentDOM, actualDOM);
