import {defineComponent} from '../../core/defineComponent.js';
import {html} from '../../core/html.js';

export const ButtonComponent = defineComponent(() => {
  return html('button', '버튼', {
    events: {
      click: () => console.log('Click!')
    }
  })
});
