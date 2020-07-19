import {html} from '../core/html.js';
import {TextComponent} from './TextComponent.js';
import {defineComponent} from '../core/defineComponent.js';

export const MainComponent = defineComponent(() => {
  return html('div', [TextComponent])
});
