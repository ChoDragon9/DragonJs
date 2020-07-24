import {fragment, html} from './fragment-dom-20200722/render.js';
import {EVENT_PREFIX} from './constants.js';

export const generate = (fragmentAST, fns) => {
  return (state) => {
    return fragment(toHTML(fragmentAST, fns));
  };
};

const toHTML = (fragmentAST, fns) => {
  return fragmentAST
    .map((node) => {
      const {tagName, children, options} = node;
      return html(
        tagName,
        Array.isArray(children)
          ? toHTML(children, fns)
          : children,
        toHTMLOptions(options, fns)
      );
    });
};

const toHTMLOptions = (options, fns) => {
  const {attrs, events} = options;

  return {
    attrs,
    events: Object
      .entries(events)
      .map(([name, fn]) => {
        if (name.startsWith(EVENT_PREFIX)) {
          return [
            name.replace(EVENT_PREFIX, ''),
            fns[fn]
          ]
        } else {
          return [name, fn]
        }
      })
      .reduce((acc, [key, value]) => {
        return {...acc, [key]: value}
      }, {})
  }
};
