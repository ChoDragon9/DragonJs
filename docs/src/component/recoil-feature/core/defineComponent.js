import {observeAtoms} from './atom.js';

export const defineComponent = (atomsOrRenderFn, renderFn) => {
  const component = parentNode => {
    if (typeof atomsOrRenderFn === 'function') {
      parentNode.appendChild(atomsOrRenderFn());
      return;
    }

    let dom = renderFn(atomsOrRenderFn);
    parentNode.appendChild(dom);

    observeAtoms(atomsOrRenderFn, () => {
      const newDom = renderFn(atomsOrRenderFn);
      parentNode.replaceChild(newDom, dom);
      dom = newDom
    });
  };

  return component;
};
