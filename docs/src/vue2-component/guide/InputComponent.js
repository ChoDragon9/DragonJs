import {component} from '../core/component.js'
import {createStore} from '../core/store.js';

const store = createStore({
  text: ''
});

export const InputComponent = component({
  template() {
    const text = store.get('text');
    return `<div>
			<input type="text" class="my-input" value="${text}">
			${text}
		</div>`
  },
  events() {
    return [
      ['.my-input', 'oninput', 'onInput'],
    ]
  },
  methods() {
    return {
      onInput(event) {
        store.set('text', event.target.value)
      },
    }
  },
  created({render}) {
    store.watch('text', render)
  }
});
