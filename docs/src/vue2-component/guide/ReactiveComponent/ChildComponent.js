import {component} from '../../core/component.js';

export const ChildComponent = component({
  template({props}) {
    return `<div>
      <h2>Child</h2>
      <p>message: ${props}</p>
      <button>Send Message</button>
    </div>`
  },
  events() {
    return [
      ['button', 'onclick', 'sendMessage']
    ]
  },
  methods({emit}) {
    return {
      sendMessage() {
        emit('Message From Child')
      }
    }
  }
});
