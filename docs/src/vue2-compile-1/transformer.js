export const transformer = ast => {
  const htmlAst = {
    tag: ast.value,
    children: ast.children.map(({type, value}) => {
      if (type === 'Template') {
        return {
          type: 'TemplateBinding',
          value: value.replace(/{{|}}/g, '')
        }
      }
      return {type, value}
    })
  };
  return htmlAst
};

const input = {
  type: 'MarkupLanguage',
  value: 'h1',
  children: [
    {type: 'Template', value: '{{text}}'}
  ]
}
const output = transformer(input);
// console.log(output)
// {
//   tag: 'h1',
//   children: [
//     {type: 'TemplateBinding', value: 'text'}
//   ]
// }
