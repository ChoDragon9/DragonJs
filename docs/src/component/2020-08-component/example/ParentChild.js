export const ChildButton = component(({fragment}, {props, emit}) => {
  const actions = {
    onClick: () => {
      emit('click')
    }
  };
  const render = () => {
    const dom = fragment(`<div>
       <button type="button">${props.buttonName}</button>
     </div>`)
    dom
      .querySelector('button')
      .addEventListener('click', actions.onClick);
    return dom;
  };

  return render;
})

export const ParentButton = component(({fragment, store}) => {
  const state = store.create({
    count: 0
  });
  const actions = {
    upCount: () => {
      state.count.set(state.count.get() + 1)
    }
  };
  const render = () => {
    const props = {
      buttonName: 'Up Count'
    };
    const emit = {
      upCount: actions.upCount
    };
    const dom = fragment(`<div>
       <div>${state.count.get()}</div>
       <ChildButton />
     </div>`);

    dom
      .querySelector('ChildButton')
      .replaceWith(ChildButton({props, emit}))

    return dom;
  };

  return render;
});
