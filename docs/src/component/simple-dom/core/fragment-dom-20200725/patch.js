export const patch = (fragmentDOM, actualDOM) => {
  // 1. 초기일 때
  if (isBeforeMount(actualDOM)) {
    appendChild(fragmentDOM, actualDOM);
    return;
  }

  // 2. 업데이트 일 때
  patchAfterMount(fragmentDOM, actualDOM);
};

const patchAfterMount = (fragmentDOM, actualDOM) => {
  const fragmentDOMChildren = toChildren(fragmentDOM);
  const actualDOMChildren = toChildren(actualDOM);

  const childrenLength = Math.max(fragmentDOMChildren.length, actualDOMChildren.length);

  range(childrenLength)
    .forEach((index) => {
      const fragment = fragmentDOMChildren[index];
      const actual = actualDOMChildren[index];

      if(isNodeRemoved(fragment)) {
        actualDOM.removeChild(actual);
      } else if (isNodeChanged(fragment, actual)) {
        actualDOM.replaceChild(fragment, actual);
      } else if (isTextChanged(fragment, actual)) {
        actualDOM.replaceChild(fragment, actual);
      } else {
        if (isAttributeChanged(fragment, actual)) {
          patchAttributes(fragment, actual);
        }
        patchAfterMount(fragment, actual)
      }
    });
};

const isNodeChanged = (fragmentDOM, actualDOM) => {
  const fragmentDOMChildren = toChildren(fragmentDOM);
  const actualDOMChildren = toChildren(actualDOM);
  return fragmentDOM.nodeName !== actualDOM.nodeName ||
    fragmentDOMChildren.length !== actualDOMChildren.length
};
const isNodeRemoved = (fragmentDOM) => fragmentDOM === undefined;
const isTextChanged = (fragmentDOM, actualDOM) => {
  if (isTextNode(fragmentDOM, actualDOM)) {
    return fragmentDOM.textContent !== actualDOM.textContent
  } else {
    return false;
  }
};

const isAttributeChanged = (fragmentDOM, actualDOM) => {
  if (isTextNode(fragmentDOM, actualDOM)) {
    return false;
  }

  const {attributes: fragAttrs} = fragmentDOM;
  const {attributes: actualAttrs} = actualDOM;

  if (fragAttrs.length !== actualAttrs.length) {
    return true;
  }
  return from(fragAttrs).some((fragAttr, index) => {
    const actualAttr = actualAttrs[index];
    return fragAttr.nodeName !== actualAttr.nodeName ||
      fragAttr.textContent !== actualAttr.textContent
  })
};

const patchAttributes = (fragmentDOM, actualDOM) => {
  from(actualDOM.attributes)
    .forEach((attr) => {
      actualDOM.removeAttributeNode(attr);
    });
  from(fragmentDOM.attributes)
    .forEach((attr) => {
      if (attr.nodeName === 'value') {
        actualDOM.value = attr.textContent;
      } else {
        actualDOM.setAttributeNode(attr.cloneNode());
      }
    })
};

const isBeforeMount = (actualDOM) => toChildren(actualDOM).length === 0;
const isTextNode = (fragmentDOM, actualDOM) => {
  const TEXT_NODE_NAME = '#text';
  return fragmentDOM.nodeName === TEXT_NODE_NAME
    && actualDOM.nodeName === TEXT_NODE_NAME
};
const toChildren = node => from(node.childNodes);
const appendChild = (fragmentDOM, actualDOM) => actualDOM.appendChild(fragmentDOM);

const from = (...args) => Array.from(...args);
const range = (length) => from({length}, (_, index) => index);

const group = (name, fn) => {
  console.group(name);
  fn();
  console.groupEnd(name);
};
