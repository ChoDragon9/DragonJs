import {html} from '../../core/html.js';
import {defineComponent} from '../../core/defineComponent.js';
import {InputComponent} from './InputComponent.js';
import {TextComponent} from './TextComponent.js';

export const MainComponent = defineComponent(() => {
  return html('div', [
    InputComponent,
    TextComponent,
    TextComponent,
    TextComponent,
    TextComponent,
    TextComponent,
  ])
});
