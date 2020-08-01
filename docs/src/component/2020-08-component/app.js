import {BasicComponent} from './example/BasicComponent.js';
import {CounterComponent} from './example/CounterComponent.js';

const app = document.querySelector('#app');

app.appendChild(BasicComponent());
app.appendChild(CounterComponent());
