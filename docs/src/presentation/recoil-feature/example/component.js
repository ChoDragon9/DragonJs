import {TextComponent} from '../components/TextComponent.js';
import {ListComponent} from '../components/ListComponent.js';
import {ButtonComponent} from './component/ButtonComponent.js';
import {TextareaComponent} from './component/TextareaComponent.js';

const TextAST = {
  type: 'text',
  value: 'Hello World'
};

const ListAST = {
  type: 'ul',
  children: [
    {
      type: 'li',
      value: 'List Item 1'
    },
    {
      type: 'li',
      value: 'List Item 1'
    }
  ]
};

[
  TextComponent(TextAST),
  ListComponent(ListAST),
  ButtonComponent(),
  TextareaComponent()
].forEach(elem => document.body.appendChild(elem));
