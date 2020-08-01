import {BasicComponent} from './BasicComponent.js';
import {CounterComponent} from './CounterComponent.js';
import {ListComponent} from './ListComponent.js';
import {ConditionComponent} from './ConditionComponent.js';
import {ParentButton} from './ParentChild.js';
import {MainComponent} from './SharedState.js';

const app = document.querySelector('#app');

app.appendChild(BasicComponent());
app.appendChild(CounterComponent());
app.appendChild(ListComponent());
app.appendChild(ConditionComponent());
app.appendChild(ParentButton());
app.appendChild(MainComponent());
