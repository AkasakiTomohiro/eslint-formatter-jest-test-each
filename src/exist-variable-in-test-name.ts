
import { Rule } from 'eslint';
import { getTestEachVariables } from './util';

export const existVariableInTestName: Rule.RuleModule = {
  meta: { 
    fixable : 'code',
    messages: {
      'UndefinedVariables': 'The test name contains a variable that is not defined.'
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
        if(parent.arguments[0].type !== 'Literal') {
          return;
        }

        // テスト名から、使用している引数の一覧取得
        const testName = parent.arguments[0].value as string;
        const matchVariables = testName.match(/\$\w*/g)?.map(m => m.replace('$', '')) ?? [] as string[];

        // 使用している引数が、テンプレート文字列に存在するかチェック
        const isNotExist = matchVariables.map(m => header.includes(m)).includes(false);
        if(isNotExist) {
          context.report({ node: parent.arguments[0], messageId: 'UndefinedVariables' });
        }
      }
    };
  }
};

