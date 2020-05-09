import {tokenizer} from './tokenizer.mjs';

const input = `<div>{{text}} Text</div>`;
const output = tokenizer(input);
console.log(output);
// [
//   '<','div','>',
//   '{{','text','}}',
//   ' Text',
//   '</','div','>'
// ]
