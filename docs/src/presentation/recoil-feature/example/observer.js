import {createObserver} from '../core/observer.js';

const observer = createObserver();

observer.observe('a', (data) => console.log('a1', data));
observer.observe('a', (data) => console.log('a2', data));
observer.observe('b', (data) => console.log('b1', data));

observer.notify('a', 'A 응답하라');
observer.notify('b', 'B 응답하라');

// a1 A 응답하라
// a2 A 응답하라
// b1 B 응답하라
