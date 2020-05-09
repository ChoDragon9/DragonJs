import {SYMBOL, SYNTAX_TYPE} from '../syntax.js';
import {VIRTUAL_CODE_SYNTAX} from './virtual-code-syntax.js';
import {useLoopGuard} from '../helper.js';

export const virtualCodeGenerator = ast => {
  const context = {
    virtualCode: [],
    currentAst: ast
  };
  const loopGuard = useLoopGuard();

  while (ast.body.length) {
    switch (true) {
      case isValue(context, SYMBOL.START_OPEN):
        generateStartTag(context);
        break;
      case isValue(context, SYMBOL.END_OPEN):
        generateEndTag(context);
        break;
      case isType(context, SYNTAX_TYPE.TAG):
        generateTag(context);
        break;
      case isType(context, SYNTAX_TYPE.TEMPLATE):
        generateTemplate(context);
        break;
      case isType(context, SYNTAX_TYPE.STRING_CONSTANT):
        generateStringConstant(context);
        break;
    }

    if (loopGuard.isMaxLoop()) {
      loopGuard.log();
      break
    }
  }

  return context.virtualCode
};

const firstNode = (context) => context.currentAst.body[0];
const isValue = (context, symbol) => firstNode(context).value === symbol;
const isType = (context, type) => firstNode(context).type === type;

const generateStartTag = context => {
  context.virtualCode.push(`${VIRTUAL_CODE_SYNTAX.ELEMENT}([`);
  context.currentAst.body.shift();
  context.virtualCode.push(`${VIRTUAL_CODE_SYNTAX.START_ELEMENT}('${firstNode(context).value}')`);
  context.currentAst.body.shift();
  context.currentAst.body.shift()
};
const generateEndTag = context => {
  context.currentAst.body.shift();
  context.virtualCode.push(`${VIRTUAL_CODE_SYNTAX.END_ELEMENT}('${firstNode(context).value}')`);
  context.currentAst.body.shift();
  context.currentAst.body.shift();
  context.virtualCode.push('])');
  if (context.currentAst.parent) {
    context.currentAst = context.currentAst.parent;
    context.currentAst.body.shift();
  }
};
const generateTag = context => {
  const newAst = firstNode(context);
  newAst.parent = context.currentAst;
  context.currentAst = newAst
};
const generateTemplate = context => {
  context.virtualCode.push(`${VIRTUAL_CODE_SYNTAX.TEMPLATE}('${firstNode(context).body[1].value}')`);
  context.currentAst.body.shift()
};
const generateStringConstant = context => {
  context.virtualCode.push(`${VIRTUAL_CODE_SYNTAX.TEXT}('${firstNode(context).value}')`);
  context.currentAst.body.shift()
};
