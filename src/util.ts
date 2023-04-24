import { Rule, SourceCode } from 'eslint';

type Node = Parameters<Exclude<Rule.NodeListener['TaggedTemplateExpression'], undefined>>[0];

type Result = {
  range: Exclude<Node['range'], undefined>
  loc: Exclude<Node['loc'], undefined | null>
  source: string
  header: string[]
  splitCharCount: number
}

/**
 * test.eachの変数を取得する
 * @param node 
 */
export function getTestEachVariables(node: Node, sourceCode: SourceCode): Result | undefined {

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
  const [headerArray, ...templateString] = node.quasi.quasis
    .map(m => m.value.raw.replace(/ /g, '').replace(/\r/g, '').replace(/\n/g, ''))
    .filter(f => f !== '');
  const header = headerArray.split('|');

  return {
    range, 
    loc, 
    source, 
    header,
    splitCharCount: templateString.length
  };
}

