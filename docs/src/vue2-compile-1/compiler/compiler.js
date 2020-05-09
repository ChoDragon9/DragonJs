import {syntaxAnalyzer} from './syntax-analyzer/index.js';
import {codeGenerator} from './code-generator/index.js';

export const compiler = (originCode) => {
  const ast = syntaxAnalyzer(originCode);
  const renderFn = codeGenerator(ast);
  return renderFn;
};
