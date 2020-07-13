import {store} from './store.js'

store.observe('presentation', (presentation) => {
  console.log(presentation);
});
store.observe('name', (name) => {
  console.log(`My Name is ${name}`);
});
store.observe('age', (age) => {
  console.log(`I'm ${age}`);
});

store.dispatch('updatePersonInfo', {
  name: 'Peter',
  age: 10,
});
store.dispatch('updatePresentation', '<div></div>');
