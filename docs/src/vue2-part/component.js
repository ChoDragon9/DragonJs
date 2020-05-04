const Component = (() => {
  const store = new Set();

  const parseHTML = (template) => {
    const shallowElement = document.createElement('div');
    shallowElement.innerHTML = template;
    return shallowElement.childNodes
  };

  const define = ({name, template}) => {
    store.add({
      name,
      template: parseHTML(template)[0]
    });
  };

  const render = (parentSelector) => {
    const parent = document.querySelector(parentSelector);

    store.forEach((component) => {
      const finedElems = parent.querySelectorAll(component.name);

      finedElems.forEach((elem) => {
        //Element 참조 방지
        const clonedTemplate = component.template.cloneNode(true);
        elem.parentNode.replaceChild(
          clonedTemplate,
          elem
        );
      });
    });
  };

  return {define, render}
})();
