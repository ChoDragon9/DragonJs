export const parser = tokens => {
  const AST = {
    type: 'MarkupLanguage',
    value: '',
    children: []
  };
  tokens.forEach(({type, value}) => {
    if (type === 'start') {
      AST.value = value.replace(/[<>]/g, '');
    }
    if (type === 'template') {
      AST.children.push({
        type: 'Template',
        value,
      })
    }
  });
  return AST
};

const input = [
  { type: 'start', value: '<h1>' },
  { type: 'template', value: '{{text}}' },
  { type: 'end', value: '</h1>' }
];
const output = parser(input);
// console.log(output);
// {
//   type: 'MarkupLanguage',
//   value: 'h1',
//   children: [
//     {type: 'Template', value: '{{text}}'}
//   ]
// }
