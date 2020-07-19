import {html} from '../../core/html.js';
import {defineComponent} from '../../core/defineComponent.js';

const renderListItem = (txt) => {
  return html('li', txt);
};
const render = () => {
  const listItem = [0, 1, 2].map(renderListItem);
  return html('ul', listItem);
};

export const ListComponent = defineComponent(render);
