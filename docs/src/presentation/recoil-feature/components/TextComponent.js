import {defineComponent} from '../core/defineComponent.js';
import {html} from '../core/html.js';

export const TextComponent = defineComponent((ast) => {
  return ast.type === 'text'
    ? html('p', ast.value)
    : null;
});
