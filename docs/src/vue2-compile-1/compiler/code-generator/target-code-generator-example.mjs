import {targetCodeGenerator} from './target-code-generator.mjs';

const input = [
  'element([',
  `startElement('div')`,
  `template('text')`,
  `text(' Text')`,
  `endElement('div')`,
  '])'
];

const output = targetCodeGenerator(input);
console.log(output)
// (state) => create.element([
//   create.startElement('div'),
//   create.template(state.text),
//   create.text(' Text'),
//   create.endElement('div'),
// ]),
