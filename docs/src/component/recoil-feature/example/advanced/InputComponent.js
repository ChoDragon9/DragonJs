import {defineComponent} from '../../core/defineComponent.js';
import {useAtom} from '../../core/atom.js';
import {html} from '../../core/html.js';
import {inputAtom} from './inputAtom.js';

export const InputComponent = defineComponent(() => {
  const [input, setInput] = useAtom(inputAtom);

  return html('input', [], {
    attrs: {
      value: input,
    },
    events: {
      input: event => setInput(event.target.value)
    }
  })
});
