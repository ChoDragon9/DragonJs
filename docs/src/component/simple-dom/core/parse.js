// interface FragmentAST {
//   tagName: string
//   children?: FragmentAST[]
//   options: {
//     attrs: object
//     events: object
//   }
// }
import {EVENT_PREFIX, TEXT_NODE} from './constants.js';

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
  return {
    tagName: toTagName(node),
    children: toChildren(node),
    options: toOptions(node)
  }
};

const toTagName = (node) => node.nodeName.toLowerCase();

const toChildren = (node) => {
  const {textContent, childNodes} = node;
  const tagName = toTagName(node);

  return tagName === TEXT_NODE
    ? textContent
    : parseChildren(childNodes);
};

const toOptions = (node) => {
  const extractedAttributes = extractAttributes(node);
  const events = extractedAttributes
    .filter(({nodeName}) => nodeName.startsWith(EVENT_PREFIX));
  const attrs = extractedAttributes
    .filter(({nodeName}) => !nodeName.startsWith(EVENT_PREFIX));

  return {
    attrs: fromEntries(attrs),
    events: fromEntries(events),
  };
};

const extractAttributes = ({attributes = []}) => {
  return Array
    .from({length: attributes.length})
    .map((_, index) => attributes[index])
    .map(({nodeName, nodeValue}) => ({nodeName, nodeValue}));
};

const fromEntries = (entries) => {
  return entries
    .reduce((acc, {nodeName, nodeValue}) => {
      return {...acc, [nodeName]: nodeValue}
    }, {})
};
