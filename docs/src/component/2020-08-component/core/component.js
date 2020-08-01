import {html} from './helper/html.js';
import {createStore} from './store.js';

export const component = (createComponent) => {
  return ({props, emit} = {props: null, emit: null}) => {
    const store = createStore();
    const render = createComponent({html, store}, {props, emit});
    let dom = render();

    store._subscribe(() => {
      const newDom = render();
      dom.replaceWith(newDom);
      dom = newDom;
    });

    return dom;
  };
};
