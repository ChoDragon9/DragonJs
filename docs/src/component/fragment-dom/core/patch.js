export const patch = (fragmentDOM, actualDOM) => {
  // 1. 초기일 때
  if (isBeforeMount(actualDOM)) {
    appendChild(fragmentDOM, actualDOM);
    return;
  }

  // 2. 업데이트 일 때
  const fragmentDOMChildren = toChildren(fragmentDOM);
  const actualDOMChildren = toChildren(actualDOM);

  const childrenLength = Math.max(fragmentDOMChildren.length, actualDOMChildren.length);

  range(childrenLength)
    .forEach((index) => {
      const fragment = fragmentDOMChildren[index];
      const actual = actualDOMChildren[index];

      group('range each', () => {
        console.dir(fragment);
        console.dir(actual);
      });
    });
};

const isBeforeMount = (actualDOM) => toChildren(actualDOM).length === 0;
const toChildren = node => node.children;
const appendChild = (fragmentDOM, actualDOM) => actualDOM.appendChild(fragmentDOM);


/**
 * isNodeChanged: (fragmentDOM, actualDOM) => boolean
 * - textContent, nodeName 비교
 * isAttributeChanged: (fragmentDOM, actualDOM) => boolean
 * - attributes 비교
 */

const range = (length) => Array.from({length}, (_, index) => index);

const group = (name, fn) => {
  console.group(name);
  fn();
  console.groupEnd(name);
};
