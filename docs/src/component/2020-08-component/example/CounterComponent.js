import {component} from '../core/component.js';

export const CounterComponent = component(({store, fragment}) => {
  const state = store.create({
    count: 0,
  });
  const actions = {
    upCount: () => {
      state.count.set(state.count.get() + 1);
    },
    downCount: () => {
      state.count.set(state.count.get() - 1);
    }
  };
  const render = () => {
    const dom = fragment(`<div>
      <button type="text" class="up">Up</button>
      <button type="text" class="down">Down</button>
      <div>${state.count.get()}</div>
    </div>`);

    dom
      .querySelector('.up')
      .addEventListener('click', actions.upCount);
    dom
      .querySelector('.down')
      .addEventListener('click', actions.downCount);

    return dom;
  };

  return render
});
