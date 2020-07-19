import {html} from '../core/html.js';
import {defineComponent} from '../core/defineComponent.js';

const renderListItem = (ast) => {
  return ast.type === 'li'
    ? html('li', ast.value)
    : null;
};
const render = (ast) => {
  const listItem = ast.children
    ? ast.children.map(renderListItem)
    : [];
  return ast.type === 'ul'
    ? html('ul', listItem)
    : null;
};

export const ListComponent = defineComponent(render);
