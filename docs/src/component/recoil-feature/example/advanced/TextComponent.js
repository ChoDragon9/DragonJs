import {defineComponent} from '../../core/defineComponent.js';
import {useAtom} from '../../core/atom.js';
import {html} from '../../core/html.js';
import {inputAtom} from './inputAtom.js';

export const TextComponent = defineComponent({inputAtom}, ({inputAtom}) => {
  const [input] = useAtom(inputAtom);

  return html('p', input)
});
