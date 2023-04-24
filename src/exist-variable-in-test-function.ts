
import { Rule } from 'eslint';
import { getTestEachVariables } from './util';

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
        
        const results = getTestEachVariables(node, sourceCode);
        if(results === undefined) {
          return;
        }
        const { header } = results;
      
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

        // テスト関数の引数一覧を取得
        const properties = parent.arguments[1].params[0].properties.map(m => {
          if(m.type === 'Property' && m.key.type === 'Identifier') {
            return m.key.name;
          }
          return undefined;
        }).filter(f => f !== undefined) as string[];

        // 使用している引数が、テンプレート文字列に存在するかチェック
        const isNotExist = properties.map(m => header.includes(m)).includes(false);
        if(isNotExist) {
          context.report({ node: parent.arguments[1], messageId: 'UndefinedVariables' });
        }
      }
    };
  }
};

