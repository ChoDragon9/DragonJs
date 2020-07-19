import {defineComponent} from '../core/defineComponent';

export const InputComponent = defineComponent({atom}, ({atom}) => {
  const [input, setInput] = useAtom(atom);

  return html('input', [], {
    attrs: {
      value: input,
    },
    events: {
      change: event => setInput(event.target.value)
    }
  })
});
