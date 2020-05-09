import {virtualCodeGenerator} from './virtual-code-generator.mjs'
import {targetCodeGenerator} from './target-code-generator.mjs'

export const codeGenerator = ast => {
  const virtualCode = virtualCodeGenerator(ast);
  const targetCode = targetCodeGenerator(virtualCode);
  return targetCode
};
