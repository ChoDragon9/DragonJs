import {component} from '../core/component.js';

export const ConditionComponent = component(({store, fragment}) => {
  const state = store.create({
    toggle: false,
  });
  const actions = {
    toggle: () => {
      state.toggle.set(!state.toggle.get())
    }
  };

  const render = () => {
    const dom = fragment(`<div>
      <h2>Condition Rendering</h2>
      <button type="button">Toggle</button>
      ${state.toggle.get() ? '<div>Hello World</div>' : ''}
    </div>`);

    dom
      .querySelector('button')
      .addEventListener('click', actions.toggle);

    return dom;
  };

  return render
});
