import {compiler} from './compiler.js';

const template = '<h1>{{text}}</h1>';
const render = compiler(template);

console.log(render({ text: 'Message' }));
// <h1>Message</h1>
console.log(render({ text: 'Message2' }));
// <h1>Message2</h1>
