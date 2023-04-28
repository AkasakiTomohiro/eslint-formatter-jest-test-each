import os from 'os';

import { Rule } from 'eslint';
import { computeWidth } from 'meaw';
import { getTestEachVariables } from './util';

type Options = {
  lineBreakStyle: 'unix' | 'windows';
  indent: number;
  eastAsianWidth: {
    N ?: number; // Neutral
    Na?: number; // Narrow
    W ?: number; // Wide
    F ?: number; // Full Width
    H ?: number; // Half Width
    A ?: number; // Ambiguous
  }
}
export const defaultOptions: Options = {
  lineBreakStyle: os.EOL === '\n' ? 'unix' : 'windows',
  indent        : 4,
  eastAsianWidth: {}
};

export const format: Rule.RuleModule = {
  meta: { 
    fixable : 'code',
    messages: {
      'TestEachArgumentMismatch'     : 'The variable specified in the header of test.each does not match the number of arguments inserted.',
      'TestEachArgumentWidthMismatch': 'Element widths are not aligned.'
    },
    schema: [
      {
        type      : 'object',
        properties: {
          lineBreakStyle: {
            enum    : ['unix', 'windows'],
            default : defaultOptions.lineBreakStyle, 
            optional: true
          },
          indent: {
            type    : 'number',
            default : 4, 
            optional: true
          },
          eastAsianWidth: {
            type      : 'object',
            properties: {
              N : { type: 'number', description: 'Neutral', optional: true },
              Na: { type: 'number', description: 'Narrow', optional: true },
              W : { type: 'number', description: 'Wide', optional: true },
              F : { type: 'number', description: 'Full Width', optional: true },
              H : { type: 'number', description: 'Half Width', optional: true },
              A : { type: 'number', description: 'Ambiguous', optional: true }
            }, 
            optional: true
          }
        }
      }
    ]
  },
  create: (context: Rule.RuleContext): Rule.RuleListener => {
    const sourceCode = context.getSourceCode();
    
    const options: Partial<Options> = context.options.length === 0 ? defaultOptions : context.options[0] ?? defaultOptions;
    const eol = (options.lineBreakStyle ?? defaultOptions.lineBreakStyle) === 'windows' ? '\r\n' : '\n';
    const indent = options.indent ?? defaultOptions.indent;
    const eastAsianWidth = {
      ...defaultOptions.eastAsianWidth,
      ...(options.eastAsianWidth ?? {})
    };
    
    return {
      TaggedTemplateExpression: (node) => {

        const results = getTestEachVariables(node, sourceCode);
        if(results === undefined) {
          return;
        }
        const { range, loc, source, header, splitCharCount } = results;

        // テンプレートに指定している引数の区切り文字数がヘッダーの引く1つ少ない数の倍数でなければ終了
        if(1 < header.length && (splitCharCount % (header.length - 1) !== 0)) {
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

        // reduceで利用する指定した分割数で配列を分割する関数
        const mapFnChunk = <T>(p: T[][], c: T, i: number, chunkSize: number): T[][] => {
          const chunkIndex = Math.floor(i / chunkSize);
          if(!p[chunkIndex]) {
            p[chunkIndex] = [];
          }
          p[chunkIndex].push(c);
          return p;
        };

        /**
         * 文字列とインデックスと元の配列を引数に取り、文字列を返す関数
         * @param element   ベースの文字列
         * @param index     ベースの文字列が格納されているインデックス
         * @param array     ベースの文字列が格納されている配列
         * @param maxLength インデックス番号に対応する最大文字数
         * @returns 
         */
        const mapFn = (element: string, index: number, array: string[], maxLength: number): string => {
          if(index === array.length - 1) {
            return element;
          } else if(index === 0) {
            return element + ' '.repeat(maxLength - computeWidth(element, eastAsianWidth));
          } else {
            return element + ' '.repeat(maxLength - computeWidth(element, eastAsianWidth));
          }
        };

        // 表のカラムごとの最大文字数を取得
        const maxLengthArray = [
          ...header.map(m => computeWidth(m, eastAsianWidth)), 
          ...argument.map(m => computeWidth(m, eastAsianWidth) + 3)
        ]

          // ${header.length}個ずつに分割
          .reduce<number[][]>((p, c, i) => mapFnChunk(p, c, i, header.length), [])

          // 2重配列のIndex番号ごとの最大値を取得
          .reduce<number[]>((p, c, i) => {
            if(i === 0) {
              return c;
            }
            return p.map((m, i) => Math.max(m, c[i]));
          }, []);

        // ベースインデントの個数を取得
        const startString = sourceCode.getText().split(eol)[loc.start.line - 1];
        const multiple = (startString.length - startString.trimStart().length) / indent;

        const startStringMatchHeader = source.split(eol)[0].indexOf(header[0]);
        let newNodeText = startStringMatchHeader === -1 ? 
          source.split(eol)[0] + eol :
          source.split(eol)[0].slice(0, startStringMatchHeader) + eol;

        // ヘッダーを追加
        newNodeText += ' '.repeat(indent * (multiple + 1)) + header.map((m, i, s) => mapFn(m, i, s, maxLengthArray[i])).join(' | ') + eol;

        // 引数を追加
        newNodeText += argument
          .reduce<string[][]>((p, c, i) => mapFnChunk(p, c, i, header.length), [])
          .map(m => ' '.repeat(indent * (multiple + 1)) + m.map((m, i, s) => mapFn(`\${${m}}`, i, s, maxLengthArray[i])).join(' | '))
          .join(eol) + eol;

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
