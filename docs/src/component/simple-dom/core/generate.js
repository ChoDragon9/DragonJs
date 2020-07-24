import {fragment, html} from './fragment-dom-20200722/render.js';
import {ATTR_PREFIX, EVENT_PREFIX} from './constants.js';

export const generate = (fragmentAST, fns) => {
  return (state) => {
    return fragment(toHTML({fragmentAST, fns, state}));
  };
};

const toHTML = ({fragmentAST, fns, state}) => {
  return fragmentAST
    .map((node) => {
      const {tagName, children, options} = node;
      return html(
        tagName,
        Array.isArray(children)
          ? toHTML({fragmentAST: children, fns, state})
          : toText(children, state),
        toHTMLOptions({options, fns, state})
      );
    });
};

const toText = (text, state = {}) => {
  return Object
    .entries(state)
    .reduce((acc, [key, value]) => {
      return acc.replace(`{{${key}}}`, value)
    }, text);
};

const toHTMLOptions = ({options, fns, state}) => {
  const {attrs, events} = options;

  return {
    attrs: toHTMLAttrs(attrs, state),
    events: toHTMLEvents(events, fns)
  }
};

const toHTMLAttrs = (attrs, state) => {
  return Object
    .entries(attrs)
    .map(([name, value]) => {
      if (name.startsWith(ATTR_PREFIX)) {
        const attrName = name.replace(ATTR_PREFIX, '');
        return [
          attrName,
          state[value]
        ]
      } else {
        return [name, value]
      }
    })
    .reduce((acc, [key, value]) => {
      return {...acc, [key]: value}
    }, {});
};

const toHTMLEvents = (events, fns) => {
  return Object
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
    }, {});
};
