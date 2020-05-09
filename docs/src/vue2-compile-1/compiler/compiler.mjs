import {syntaxAnalyzer} from './syntax-analyzer/index.mjs';
import {codeGenerator} from './code-generator/index.mjs';

export const compiler = (originCode) => {
  const ast = syntaxAnalyzer(originCode);
  const renderFn = codeGenerator(ast);
  return renderFn;
};
