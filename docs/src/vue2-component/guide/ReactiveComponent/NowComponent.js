import {component} from '../../core/component.js';

export const NowComponent = component({
  template({props}) {
    return `<h1>Now: ${props}</h1>`
  }
});
