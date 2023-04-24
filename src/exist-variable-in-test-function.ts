
import { Rule } from 'eslint';

export const existVariableInTestFunction: Rule.RuleModule = {
  meta: { 
    fixable : 'code',
    messages: {
      'UndefinedVariables': 'The test function argument contains a variable that is not defined.'
    }
  },
  create: (context: Rule.RuleContext): Rule.RuleListener => {
    const sourceCode = context.getSourceCode();
    
    return {
      TaggedTemplateExpression: (node) => {
        
        // rangeとlocがなければ終了;
        const { range, loc } = node;
        if(range === undefined || loc === null || loc === undefined) {
          return;
        }

        // test.eachでなければ終了
        const source = sourceCode.getText(node);
        if(!source.match(/^test\.each.*/)) {
          return;
        }

        // 親の引数に第1引数にLiteralがなければ終了
        const parent = node.parent;
        if(parent.type !== 'CallExpression' || parent.arguments.length !== 2) {
          return;
        }
        if(
          parent.arguments[1].type !== 'ArrowFunctionExpression' || 
          parent.arguments[1].params.length !== 1 || 
          parent.arguments[1].params[0].type !== 'ObjectPattern'
        ) {
          return;
        }

        // テンプレート文字列を取得
        const [headerArray] = node.quasi.quasis
          .map(m => m.value.raw.replace(/ /g, '').replace(/\r/g, '').replace(/\n/g, ''))
          .filter(f => f !== '');
        const header = headerArray.split('|');
        const properties = parent.arguments[1].params[0].properties.map(m => {
          if(m.type === 'Property' && m.key.type === 'Identifier') {
            return m.key.name;
          }
          return undefined;
        }).filter(f => f !== undefined) as string[];

        const isExist = properties.map(m => header.includes(m)).includes(false);
        if(isExist) {
          context.report({ node: parent.arguments[0], messageId: 'UndefinedVariables' });
        }
      }
    };
  }
};

