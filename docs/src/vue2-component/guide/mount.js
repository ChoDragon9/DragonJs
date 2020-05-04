import {ButtonComponent} from './ButtonComponent.js';
import {CounterComponent} from './CounterComponent.js';
import {ReactiveComponent} from './ReactiveComponent.js';

document
  .querySelector('#app')
  .appendChild(ButtonComponent())
  .appendChild(CounterComponent())
  .appendChild(ReactiveComponent());
