import {component} from '../core/component'

export const NowComponent = component({
  template({props}) {
    return `<h1>Now: ${props}</h1>`
  }
});
