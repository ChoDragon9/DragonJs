import {virtualCodeGenerator} from './virtual-code-generator.js'
import {targetCodeGenerator} from './target-code-generator.js'

export const codeGenerator = ast => {
  const virtualCode = virtualCodeGenerator(ast);
  const targetCode = targetCodeGenerator(virtualCode);
  return targetCode
};
