import {tokenizer} from './tokenizer.js';
import {parser} from './parser.js';

export const syntaxAnalyzer = (originCode) => {
  const tokens = tokenizer(originCode);
  const ast = parser(tokens);
  return ast
};

// tokenizer
// Step 1.
// `<div>Text</div>`
// Step 2.
// `<div>{{text}} Text</div>`
// Step 3.
// `<div>{{text}} Text<div>{{text}}</div></div>`
// Step 4.
// `<div>
//   {{text}} Text
//   <div>{{text}}</div>
// </div>`

// parser
// Step 1.
// ['<', 'div', '>', 'Text', '</', 'div', '>']
// Step 2.
// [
//   '<','div','>',
//   '{{','text','}}',
//   ' Text',
//   '</','div','>'
// ]
// Step 3.
// [
//   '<','div','>',
//   '{{','text','}}',
//   ' Text',
//   '<','div','>',
//   '{{','text','}}',
//   '</','div','>',
//   '</','div','>'
// ]
