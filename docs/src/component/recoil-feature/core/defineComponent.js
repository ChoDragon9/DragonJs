export const defineComponent = (atomsOrRenderFn, renderFn) => {
  const component = parentNode => {
    if (typeof atomsOrRenderFn === 'function') {
      parentNode.appendChild(atomsOrRenderFn());
      return;
    }
    let dom = renderFn();
    parentNode.appendChild(dom);

    observe(atoms, () => {
      const newDom = renderFn();
      parentNode.replaceChild(newDom, dom);
      dom = newDom
    });
  };

  return component;
};
