// interface FragmentAST {
//   tagName: string
//   children?: FragmentAST[]
//   options: {
//     attrs: object
//     events: object
//   }
// }
export const parse = (template) => {
  const childNodes = parseHTML(template);
  return parseChildren(childNodes)
};

const parseHTML = (template) => {
  const div = document.createElement('div');
  div.innerHTML = template;
  return div.childNodes;
};

const parseChildren = (childNodes) => {
  return Array
    .from(childNodes)
    .map(toFragmentAST);
};

const toFragmentAST = (node) => {
  const {
    nodeName,
    attributes = [],
    textContent,
    childNodes
  } = node;
  const tagName = nodeName.toLowerCase();
  const TEXT_NODE = '#text';
  const EVENT_PREFIX = '@';

  const extractAttributes = Array
    .from({length: attributes.length})
    .map((_, index) => attributes[index])
    .map(({nodeName, nodeValue}) => ({nodeName, nodeValue}));

  const events = extractAttributes
    .filter(({nodeName}) => nodeName.startsWith(EVENT_PREFIX));
  const attrs = extractAttributes
    .filter(({nodeName}) => !nodeName.startsWith(EVENT_PREFIX));

  return {
    tagName,
    children:
      tagName === TEXT_NODE
        ? textContent
        : parseChildren(childNodes),
    options: {
      attrs: fromEntries(attrs),
      events: fromEntries(events),
    }
  }
};

const fromEntries = (entries) => {
  return entries
    .reduce((acc, {nodeName, nodeValue}) => {
      return {...acc, [nodeName]: nodeValue}
    }, {})
};
