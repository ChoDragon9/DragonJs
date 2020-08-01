import {component} from '../core/component.js';

export const BasicComponent = component(({fragment}) => {
  const render = () => {
    return fragment(`<div>Hello World!</div>`);
  };

  return render
});
