import {defineComponent} from '../../core/defineComponent.js';
import {html} from '../../core/html.js';

export const TextareaComponent = defineComponent(() => {
  const events = {
    input: (event) => {
      console.log(event.target.value)
    }
  };
  return html('textarea', '', {events})
});
