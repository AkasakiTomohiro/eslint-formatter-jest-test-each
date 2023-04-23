import { RuleTester } from 'eslint';
import fs from 'fs';

import { format } from '../src/format';

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6
  }
});

ruleTester.run('jest-test-each-formatting/format', format, {
  valid: [{
    filename: './test/sample/format/sample.spec.js',
    code    : fs.readFileSync('./test/sample/format/sample.spec.js', 'utf-8'),
    options : [{
      lineBreakStyle: 'windows',
      indent        : 2
    }]
  }],
  invalid: [
    {
      filename: './test/sample/format/sample-error1.spec.js',
      code    : fs.readFileSync('./test/sample/format/sample-error1.spec.js', 'utf-8'),
      errors  : [{
        messageId: 'TestEachArgumentMismatch'
      }],
      options: [{
        lineBreakStyle: 'windows',
        indent        : 2
      }]
    },
    {
      filename: './test/sample/format/sample-error2.spec.js',
      code    : fs.readFileSync('./test/sample/format/sample-error2.spec.js', 'utf-8'),
      errors  : [{
        messageId: 'TestEachArgumentMismatch'
      }],
      options: [{
        lineBreakStyle: 'windows',
        indent        : 2
      }]
    },
    {
      filename: './test/sample/format/sample-error3.spec.js',
      code    : fs.readFileSync('./test/sample/format/sample-error3.spec.js', 'utf-8'),
      errors  : [{
        messageId: 'TestEachArgumentWidthMismatch'
      }],
      output : fs.readFileSync('./test/sample/format/sample.spec.js', 'utf-8'),
      options: [{
        lineBreakStyle: 'windows',
        indent        : 2
      }]
    },
    {
      filename: './test/sample/format/sample-error4.spec.js',
      code    : fs.readFileSync('./test/sample/format/sample-error4.spec.js', 'utf-8'),
      errors  : [{
        messageId: 'TestEachArgumentWidthMismatch'
      }],
      output : fs.readFileSync('./test/sample/format/sample.spec.js', 'utf-8'),
      options: [{
        lineBreakStyle: 'windows',
        indent        : 2
      }]
    },
    {
      filename: './test/sample/format/sample-error5.spec.js',
      code    : fs.readFileSync('./test/sample/format/sample-error5.spec.js', 'utf-8'),
      errors  : [{
        messageId: 'TestEachArgumentWidthMismatch'
      }],
      output : fs.readFileSync('./test/sample/format/sample.spec.js', 'utf-8'),
      options: [{
        lineBreakStyle: 'windows',
        indent        : 2
      }]
    }
  ]
});
