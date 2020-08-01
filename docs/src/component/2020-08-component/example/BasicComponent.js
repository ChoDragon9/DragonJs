import {component} from '../core/component.js';

export const BasicComponent = component(({fragment}) => {
  const render = () => {
    return fragment(`<div>
      <h2>Basic Component</h2>
      Hello World!
    </div>`);
  };

  return render
});
