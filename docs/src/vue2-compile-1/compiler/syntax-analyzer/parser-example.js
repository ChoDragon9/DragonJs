import {parser} from './parser.js';

const input = [
  '<','div','>',
  '{{','text','}}',
  ' Text',
  '</','div','>'
];
const output = parser(input);
console.log(output.body[3]);
// {
//   type: 'Tag',
//   body: [
//     { type: 'Symbol', value: '<' },
//     { type: 'Keyword', value: 'div' },
//     { type: 'Symbol', value: '>' },
//     {
//       type: 'Template',
//       body: [
//         { type: 'Symbol', value: '{{' },
//         { type: 'Keyword', value: 'text' },
//         { type: 'Symbol', value: '}}' }
//       ],
//     },
//     { type: 'StringConstant', value: ' Text' },
//     { type: 'Symbol', value: '</' },
//     { type: 'Keyword', value: 'div' },
//     { type: 'Symbol', value: '>' }
//   ],
// }
