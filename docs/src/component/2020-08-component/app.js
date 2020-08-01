import {BasicComponent} from './example/BasicComponent.js';
import {CounterComponent} from './example/CounterComponent.js';
import {ListComponent} from './example/ListComponent.js';
import {ConditionComponent} from './example/ConditionComponent.js';
import {ParentButton} from './example/ParentChild.js';

const app = document.querySelector('#app');

app.appendChild(BasicComponent());
app.appendChild(CounterComponent());
app.appendChild(ListComponent());
app.appendChild(ConditionComponent());
app.appendChild(ParentButton())
