import {component} from './core/component'
import {createStore} from './core/store';

const store = createStore({
  count: 0
});

export const CounterComponent = component({
  template() {
    const count = store.get('count');
    return `<div>
			<button class="up">Up</button>
			${count}
			<button class="down">Down</button>
		</div>`
  },
  events() {
    return [
      ['.up', 'onclick', 'upCount'],
      ['.down', 'onclick', 'downCount'],
    ]
  },
  methods() {
    return {
      upCount() {
        this.calcCount(1)
      },
      downCount() {
        this.calcCount(-1)
      },
      calcCount(num) {
        this.setCount(this.getCount() + num)
      },
      getCount() {
        return store.get('count')
      },
      setCount(count) {
        store.set('count', count)
      }
    }
  },
  created({render}) {
    store.watch('count', render)
  }
});
