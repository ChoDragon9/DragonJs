import {lexer} from './lexer.js';
import {parser} from './parser.js';
import {transformer} from './transformer.js';
import {generator} from './generator.js';

export const compiler = (code) => {
  const tokens = lexer(code);
  const ast = parser(tokens);
  const htmlAst = transformer(ast);
  const renderFn = generator(htmlAst);
  return renderFn;
};

const input = '<h1>{{text}}</h1>';
const output = compiler(input);
// console.log(output);
// (state) => createElement('h1', state.text)
