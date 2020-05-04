const Directive = (() => {
  const store = new Set();

  const define = ({name, bind}) => {
    store.add({name, bind});
  };

  const parseAttr = (_attr) => {
    let attr = _attr;
    if (attr.indexOf('(') > -1) {
      attr = attr
        .replace('(', ',')
        .replace(')', '');
    }

    return attr.split(',');
  };

  const render = (parentSelector) => {
    const parent = document.querySelector(parentSelector);

    store.forEach((directive) => {
      const finedElems = parent.querySelectorAll(`[${directive.name}]`);

      finedElems.forEach((elem) => {
        const directiveValue = parseAttr(elem.getAttribute(directive.name));
        directive.bind(elem, directiveValue);
      });
    });
  };

  return {define, parseAttr, render}
})();
