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
      <button type="button">Toggle</button>
      ${store.toggle.get() ? '<div>Hello World</div>' : ''}
    </div>`);

    dom
      .querySelector('button')
      .addEventListener('click', actions.toggle);

    return dom;
  };

  return render
});
