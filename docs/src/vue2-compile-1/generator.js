const createElement = (tag, text) => `<${tag}>${text}</${tag}>`;

export const generator = htmlAst => {
  const [child] = htmlAst.children;
  const text = child.type === 'TemplateBinding'
    ? `state.${child.value}`
    : `'${child.value}'`;
  return (state) => new Function(
    'createElement',
    'state',
    `return createElement('${htmlAst.tag}', ${text})`
  )(createElement, state);
};

const input = {
  tag: 'h1',
  children: [
    {type: 'TemplateBinding', value: 'text'}
  ]
}
const output = generator(input);
// console.log(output)
// (state) => createElement('h1', state.text)
