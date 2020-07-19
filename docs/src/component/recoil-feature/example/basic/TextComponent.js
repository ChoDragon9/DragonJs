import {defineComponent} from '../../core/defineComponent.js';
import {html} from '../../core/html.js';

export const TextComponent = defineComponent(() => {
  return html('p', 'Text')
});
