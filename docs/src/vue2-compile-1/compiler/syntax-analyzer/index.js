import {tokenizer} from './tokenizer.js';
import {parser} from './parser.js';

export const syntaxAnalyzer = (originCode) => {
  const tokens = tokenizer(originCode);
  const ast = parser(tokens);
  return ast
};
