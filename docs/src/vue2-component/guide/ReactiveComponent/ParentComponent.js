import {component} from '../../core/component.js';
import {ChildComponent} from './ChildComponent.js';

export const ParentComponent = component({
  data() {
    return {
      message: 'From Parent'
    }
  },
  template() {
    return `<div>
      <h1>Parent</h1>
      <child-component 
        bind-props="message"
        on="onEmit"></child-component>
    </div>`
  },
  components() {
    return [
      ['child-component', ChildComponent]
    ]
  },
  methods({store}) {
    return {
      onEmit(message) {
        store.set('message', message)
      }
    }
  }
});
