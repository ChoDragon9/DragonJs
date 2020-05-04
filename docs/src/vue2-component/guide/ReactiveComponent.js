import {component} from '../core/component.js';
import {NowComponent} from './ReactiveComponent/NowComponent.js';
import {NowControllerComponent} from './ReactiveComponent/NowControllerComponent.js';
import {ParentComponent} from './ReactiveComponent/ParentComponent.js';

export const ReactiveComponent = component({
  data() {
    return {
      now: Date.now()
    }
  },
  template() {
    return `<div>
      <now bind-props="now"></now>
      <now-controller on="changeNow"></now-controller>
      <parent-component></parent-component>
    </div>`
  },
  components() {
    return [
      ['now', NowComponent],
      ['now-controller', NowControllerComponent],
      ['parent-component', ParentComponent],
    ]
  },
  methods({store}) {
    return {
      changeNow(data, message) {
        console.log(message)
        store.set('now', data)
      },
    }
  }
})
