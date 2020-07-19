import {html} from '../../core/html.js';
import {TextComponent} from './TextComponent.js';
import {defineComponent} from '../../core/defineComponent.js';
import {ListComponent} from './ListComponent.js';
import {ButtonComponent} from './ButtonComponent.js';

export const MainComponent = defineComponent(() => {
  return html('div', [
    TextComponent,
    ListComponent,
    ButtonComponent,
  ])
});
