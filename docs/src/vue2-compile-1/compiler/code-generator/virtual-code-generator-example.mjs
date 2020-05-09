import {virtualCodeGenerator} from './virtual-code-generator.mjs';

const input = {
  type: 'Tag',
  body: [
    { type: 'Symbol', value: '<' },
    { type: 'Keyword', value: 'div' },
    { type: 'Symbol', value: '>' },
    {
      type: 'Template',
      body: [
        { type: 'Symbol', value: '{{' },
        { type: 'Keyword', value: 'text' },
        { type: 'Symbol', value: '}}' }
      ],
    },
    { type: 'StringConstant', value: ' Text' },
    { type: 'Symbol', value: '</' },
    { type: 'Keyword', value: 'div' },
    { type: 'Symbol', value: '>' }
  ],
};
const output = virtualCodeGenerator(input);
console.log(output);
// [
//   'element([',
//   "startElement('div')",
//   "template('text')",
//   "text(' Text')",
//   "endElement('div')",
//   '])'
// ]
