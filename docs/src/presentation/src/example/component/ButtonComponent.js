import {defineComponent} from '../../core/defineComponent.js';
import {html} from '../../core/html.js';

export const ButtonComponent = defineComponent(() => {
  const events = {
    click: () => console.log('onClick')
  };
  const attrs = {
    type: 'button'
  };
  return html('button', '버튼', {events, attrs})
});
