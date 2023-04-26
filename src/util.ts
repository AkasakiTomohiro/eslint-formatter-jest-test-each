import { Rule, SourceCode } from 'eslint';

type Node = Parameters<Exclude<Rule.NodeListener['TaggedTemplateExpression'], undefined>>[0];

const matchList = [
  'test.each'
] as const;
type MatchString = typeof matchList[number];

type Result = {
  range: Exclude<Node['range'], undefined>
  loc: Exclude<Node['loc'], undefined | null>
  source: string
  header: string[]
  splitCharCount: number
  matchString: MatchString
}

/**
 * jest eachの変数を取得する
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

  const match = (matchList.map(m => source.match(new RegExp(`^${m.replace('.', '\.')}.*`))).filter(f => f !== null) as RegExpMatchArray[]);
  if(match.length === 0 || match[0].length === 0) {
    return;
  }
  const matchString = match[0][0].split('`')[0] as MatchString;

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
    matchString,
    splitCharCount: templateString.length
  };
}

