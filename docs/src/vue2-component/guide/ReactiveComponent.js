import {component} from './core/component'
import {NowComponent} from './ReactiveComponent/NowComponent';
import {NowControllerComponent} from './ReactiveComponent/NowControllerComponent';
import {ParentComponent} from './ReactiveComponent/ParentComponent';

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
