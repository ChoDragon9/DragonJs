import {html} from './core/render.js';

const render = (list) => {
  const options = {
    attrs: {
      style: 'font-size: 20px'
    },
    events: {
      click: (event) => event.target.style.fontWeight = 'bold'
    }
  };
  const children = list.map(text => html('li', text, options));
  return html('ul', children);
};

const actualDOM = document.querySelector('#app');
const fragmentDOM = render(['Apple', 'Orange', 'Melon']);

actualDOM.appendChild(fragmentDOM);
