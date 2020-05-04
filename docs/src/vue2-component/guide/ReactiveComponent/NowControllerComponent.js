import {component} from '../core/component'

export const NowControllerComponent = component({
  template() {
    return `<div>
			<button class="now-btn">Change Now</button>
		</div>`
  },
  events() {
    return [
      ['button.now-btn', 'onclick', 'changeNow'],
    ]
  },
  methods({emit}) {
    return {
      changeNow() {
        emit(Date.now(), 'from Child')
      },
    }
  }
});
