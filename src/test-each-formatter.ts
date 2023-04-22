import { Rule } from 'eslint';
import { computeWidth } from 'meaw';

export const format: Rule.RuleModule = {
  meta: { 
    fixable : 'code',
    messages: {
      'TestEachArgumentMismatch'     : 'The variable specified in the header of test.each does not match the number of arguments inserted.',
      'TestEachArgumentWidthMismatch': 'Element widths are not aligned.'
    }
  },
  create: (context: Rule.RuleContext): Rule.RuleListener => {
    if(!context.getFilename().match(/.*\.(test|spec).(js|jsx|ts|tsx)$/)) {
      return {};
    }
    const sourceCode = context.getSourceCode();

    const newLine = '\r\n';
    return {
      TaggedTemplateExpression: (node) => {

        // rangeとlocがなければ終了
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
          .map(m => m.value.raw.replace(/ /g, '').replace(/\n/g, ''))
          .filter(f => f !== '');
        const header = headerArray.split('|');

        // テンプレートに指定している引数の区切り文字数がヘッダーの引く1つ少ない数の倍数でなければ終了
        if(templateString.length % (header.length - 1) !== 0) {
          context.report({ node, messageId: 'TestEachArgumentMismatch' });
          return;
        }

        // 引数を取得
        const argument = node.quasi.expressions.map(m => {
          const mRange = m.range as [number, number];
          return sourceCode.getText(node, range[0] - mRange[0], mRange[1] - range[1]);
        });

        // 引数の数がヘッダーの倍数でなければ終了
        if(argument.length === 0 || argument.length % header.length !== 0) {
          context.report({ node, messageId: 'TestEachArgumentMismatch' });
          return;
        }

        // 表のカラムごとの最大文字数を取得
        const maxLengthArray = [...header.map(m => computeWidth(m)), ...argument.map(m => computeWidth(m) + 3)]

          // ${header.length}個ずつに分割
          .reduce((p, c, i) => chunk(p, c, i, header.length), [] as number[][])

          // 2重配列のIndex番号ごとの最大値を取得
          .reduce((p, c, i) => {
            if(i === 0) {
              return c;
            }
            p = p.map((m, i) => Math.max(m, c[i]));
            return p;
          }, [] as number[]);

        // 1インデントにおける半角スペースの数を取得
        const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
        const indent = sourceCode.getText()
          .split(newLine)

          // 先頭にある空白の個数を取得
          .map(m => m.length - m.trimStart().length)

          // 0は除外し、重複を削除
          .filter((f, i, s) => f !== 0 && i === s.indexOf(f))

          // 最大公約数を取得
          .reduce(gcd);

        // ベースインデントの個数を取得
        const startString = sourceCode.getText().split(newLine)[loc.start.line - 1];
        const multiple = (startString.length - startString.trimStart().length) / indent;

        const startStringMatchHeader = source.split(newLine)[0].indexOf(header[0]);
        let newNodeText = startStringMatchHeader === -1 ? 
          source.split(newLine)[0] + newLine : source.split(newLine)[0].slice(0, startStringMatchHeader) + newLine;

        // ヘッダーを追加
        newNodeText += ' '.repeat(indent * (multiple + 1)) + header.map((m, i, s) => mapFn(m, i, s, maxLengthArray[i])).join(' | ') + newLine;

        // 引数を追加
        newNodeText += argument
          .reduce((p, c, i) => chunk(p, c, i, header.length), [] as string[][])
          .map(m => ' '.repeat(indent * (multiple + 1)) + m.map((m, i, s) => mapFn(`\${${m}}`, i, s, maxLengthArray[i])).join(' | '))
          .join(newLine) + newLine;

        // エンドインデントを追加
        newNodeText += ' '.repeat(indent * multiple) + '`';

        // 生成した文字列と元の文字列が異なる場合は修正
        if(source !== newNodeText) {
          context.report({
            node,
            messageId: 'TestEachArgumentWidthMismatch',
            fix      : (fixer) => fixer.replaceText(node, newNodeText)
          });
        }
      }
    };
  }
};

/**
 * 文字列とインデックスと元の配列を引数に取り、文字列を返す関数
 * @param element   ベースの文字列
 * @param index     ベースの文字列が格納されているインデックス
 * @param array     ベースの文字列が格納されている配列
 * @param maxLength インデックス番号に対応する最大文字数
 * @returns 
 */
function mapFn(element: string, index: number, array: string[], maxLength: number): string {
  if(index === 0) {
    return element + ' '.repeat(maxLength - computeWidth(element));
  } else if(index === array.length - 1) {
    return element;
  }
  return element + ' '.repeat(maxLength - computeWidth(element));
}

/**
 * reduceで利用する指定した分割数で配列を分割する関数
 */
function chunk<T>(p: T[][], c: T, i: number, chunkSize: number): T[][] {
  const chunkIndex = Math.floor(i / chunkSize);
  if(!p[chunkIndex]) {
    p[chunkIndex] = [];
  }
  p[chunkIndex].push(c);
  return p;
}
