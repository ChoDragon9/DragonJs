import {VIRTUAL_CODE_SYNTAX} from './virtual-code-syntax.mjs';

const TARGET_CODE_SYNTAX = {
  CREATE: 'create',
  STATE: 'state',
};

const create = {
  element: (children) => children.join(''),
  startElement: (tag) => `<${tag}>`,
  endElement: (tag) => `</${tag}>`,
  text: (txt) => txt,
  template: (value) => value
};

export const targetCodeGenerator = virtualCode => {
  const targetCode = virtualCode
    .map(code => {
      const comma = code.endsWith(')') ? ',' : '';
      switch (true) {
        case code.startsWith(VIRTUAL_CODE_SYNTAX.ELEMENT):
        case code.startsWith(VIRTUAL_CODE_SYNTAX.START_ELEMENT):
        case code.startsWith(VIRTUAL_CODE_SYNTAX.END_ELEMENT):
        case code.startsWith(VIRTUAL_CODE_SYNTAX.TEXT):
          return `${TARGET_CODE_SYNTAX.CREATE}.${code}${comma}`;
        case code.startsWith(VIRTUAL_CODE_SYNTAX.TEMPLATE):
          const templateFn = code
            .replace(`('`, `(${TARGET_CODE_SYNTAX.STATE}.`)
            .replace(`')`, `)`);
          return `${TARGET_CODE_SYNTAX.CREATE}.${templateFn}${comma}`;
        default:
          return `${code}${comma}`
      }
    })
    .join('')
    .replace(/,$/, ''); // remove last comma

  return (state) => new Function(
    TARGET_CODE_SYNTAX.CREATE,
    TARGET_CODE_SYNTAX.STATE,
    `return ${targetCode}`
  )(create, state);
};

// const input = [
//   'element([',
//   "startElement('div')",
//   "text('Text')",
//   "template('text')",
//   'element([',
//   "startElement('div')",
//   "text('Text')",
//   "endElement('div')",
//   '])',
//   "endElement('div')",
//   '])'
// ];
// const output = targetCodeGenerator(input);
// console.log(output)
// (state) => create.element([
//   create.startElement('div'),
//   create.text('Text'),
//   create.template(state.text),
//   create.element([
//     create.startElement('div'),
//     create.text('Text'),
//     create.endElement('div'),
//   ]),
//   create.endElement('div'),
// ]),
