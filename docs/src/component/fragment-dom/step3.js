import {fragment, html} from './core/render.js';
import {patch} from './core/patch.js';

const render = (state) => {
  return fragment([
    html('input', [], {
      attrs: {
        type: 'text',
        value: state.toUpperCase()
      },
      events: {input: onChange}
    }),
    html('input', [], {
      attrs: {
        type: 'checkbox',
        class: 'checkbox-item'
      }
    }),
    html('p', state),
    html('textarea', state),
  ]);
};

const onChange = (event) => {
  mount(event.target.value);
};

const mount = (state) => {
  const actualDOM = document.querySelector('#app');
  const fragmentDOM = render(state);

  patch(fragmentDOM, actualDOM);
};

mount('');
