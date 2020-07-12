import {defineComponent} from '../core/defineComponent';

export const TextInputComponent = defineComponent(() => {
  return html('div', [
    html('textarea', {
      onChange: () => console.log('text')
    })
  ])
});
