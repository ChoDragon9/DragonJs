import {createStore} from '../core/store.js';
import {component} from '../core/component.js';

const sharedStore = createStore();
const sharedState = sharedStore.create({
  count: 0
});

export const CounterButton = component(({fragment, store}) => {
  store.share(sharedStore);

  const actions = {
    upCount: () => {
      sharedState.count.set(sharedState.count.get() + 1)
    }
  };
  const render = () => {
    const dom = fragment(`<div>
       <button type="button">Up Count</button>
     </div>`);

    dom
      .querySelector('button')
      .addEventListener('click', actions.upCount);

    return dom;
  };

  return render;
});

export const MainComponent = component(({fragment, store}) => {
  store.share(sharedStore);

  return () => {
    const dom = fragment(`<div>
      <h2>Shared State</h2>
      ${sharedState.count.get()}
      <counter-button1></counter-button1>
      <counter-button2></counter-button2>
    </div>`);

    dom
      .querySelector('counter-button1')
      .replaceWith(CounterButton());
    dom
      .querySelector('counter-button2')
      .replaceWith(CounterButton());

    return dom;
  }
});
