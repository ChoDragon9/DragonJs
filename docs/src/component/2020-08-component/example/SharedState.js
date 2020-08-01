const sharedState = store.create({
  count: 0
});
export const CounterButton = component(({fragment, store}) => {
  const state = store.share(sharedState);
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
       <button type="button">Up Count</button>
     </div>`);

    dom
      .querySelector('button')
      .addEventListener('click', actions.upCount)

    return dom;
  };

  return render;
});

export const MainComponent = component(({fragment}) => {
  return () => {
    const dom = fragment(`<div>
      <CounterButton1 />
      <CounterButton2 />
    </div>`);

    dom
      .querySelector('CounterButton1')
      .replaceWith(CounterButton())
    dom
      .querySelector('CounterButton2')
      .replaceWith(CounterButton())

    return dom;
  }
});
