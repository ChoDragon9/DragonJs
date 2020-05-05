const createElement = (tag, text) => `<${tag}>${text}</${tag}>`;
const render = (state) => {
  const renderFn = new Function(
    'createElement',
    'state',
    `return createElement('h1', state.text)`
  )
  return renderFn(createElement, state)
};
console.log(render({ text: 'Message' }));
// <h1>Message</h1>
console.log(render({ text: 'Message2' }));
// <h1>Message2</h1>
