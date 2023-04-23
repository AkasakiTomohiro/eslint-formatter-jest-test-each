
import { Rule } from 'eslint';

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

        // テンプレート文字列を取得
        const [headerArray] = node.quasi.quasis
          .map(m => m.value.raw.replace(/ /g, '').replace(/\r/g, '').replace(/\n/g, ''))
          .filter(f => f !== '');
        const header = headerArray.split('|');
        console.log(header);
        const parent = node.parent;
        if(parent.type !== 'CallExpression') {
          return;
        }
        if(parent.arguments[0].type !== 'Literal') {
          return;
        }
        const testName = parent.arguments[0].value as string;
        const matchVariables = testName.match(/\$\w*/g)?.map(m => m.replace('$', '')) ?? [] as string[];
        console.log(testName, matchVariables);
        const isExist = matchVariables.map(m => header.includes(m)).includes(false);
        if(isExist) {
          context.report({ node: parent.arguments[0], messageId: 'UndefinedVariables' });
        }
      }
    };
  }
};

