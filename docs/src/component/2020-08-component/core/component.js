import {fragment} from './helper/fragment.js';
import {createStore} from './store.js';

export const component = (createComponent) => {
  return () => {
    const store = createStore();
    const render = createComponent({fragment, store});
    let dom = render();

    store._subscribe(() => {
      const newDom = render();
      dom.replaceWith(newDom);
      dom = newDom;
    });

    return dom;
  };
};
