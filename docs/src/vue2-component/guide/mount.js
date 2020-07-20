import {ButtonComponent} from './ButtonComponent.js';
import {CounterComponent} from './CounterComponent.js';
import {ReactiveComponent} from './ReactiveComponent.js';
import {InputComponent} from './InputComponent.js';

document
  .querySelector('#app')
  .appendChild(ButtonComponent())
  .appendChild(CounterComponent())
  .appendChild(ReactiveComponent())
  .appendChild(InputComponent());
