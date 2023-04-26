import { RuleTester } from 'eslint';
import fs from 'fs';

import { existVariableInTestFunction } from '../src/exist-variable-in-test-function';
import { existVariableInTestName } from '../src/exist-variable-in-test-name';
import { format } from '../src/format';

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6
  }
});

ruleTester.run('jest-test-each-formatting/format', format, {
  valid: [{
    filename: './test/sample/format/test-each/sample.spec.js',
    code    : fs.readFileSync('./test/sample/format/test-each/sample.spec.js', 'utf-8'),
    options : [{
      indent: 2
    }]
  }],
  invalid: [
    {
      filename: './test/sample/format/test-each/sample-error1.spec.js',
      code    : fs.readFileSync('./test/sample/format/test-each/sample-error1.spec.js', 'utf-8'),
      errors  : [{
        messageId: 'TestEachArgumentMismatch'
      }],
      options: [{
        lineBreakStyle: 'windows',
        indent        : 2
      }]
    },
    {
      filename: './test/sample/format/test-each/sample-error2.spec.js',
      code    : fs.readFileSync('./test/sample/format/test-each/sample-error2.spec.js', 'utf-8'),
      errors  : [{
        messageId: 'TestEachArgumentMismatch'
      }],
      options: [{
        lineBreakStyle: 'windows',
        indent        : 2
      }]
    },
    {
      filename: './test/sample/format/test-each/sample-error3.spec.js',
      code    : fs.readFileSync('./test/sample/format/test-each/sample-error3.spec.js', 'utf-8'),
      errors  : [{
        messageId: 'TestEachArgumentWidthMismatch'
      }],
      output : fs.readFileSync('./test/sample/format/test-each/sample.spec.js', 'utf-8'),
      options: [{
        lineBreakStyle: 'windows',
        indent        : 2
      }]
    },
    {
      filename: './test/sample/format/test-each/sample-error4.spec.js',
      code    : fs.readFileSync('./test/sample/format/test-each/sample-error4.spec.js', 'utf-8'),
      errors  : [{
        messageId: 'TestEachArgumentWidthMismatch'
      }],
      output : fs.readFileSync('./test/sample/format/test-each/sample.spec.js', 'utf-8'),
      options: [{
        lineBreakStyle: 'windows',
        indent        : 2
      }]
    },
    {
      filename: './test/sample/format/test-each/sample-error5.spec.js',
      code    : fs.readFileSync('./test/sample/format/test-each/sample-error5.spec.js', 'utf-8'),
      errors  : [{
        messageId: 'TestEachArgumentWidthMismatch'
      }],
      output : fs.readFileSync('./test/sample/format/test-each/sample.spec.js', 'utf-8'),
      options: [{
        lineBreakStyle: 'windows',
        indent        : 2
      }]
    }
  ]
});

ruleTester.run('jest-test-each-formatting/exist-variable-in-test-name', existVariableInTestName, {
  valid: [
    {
      filename: './test/sample/exist-variable-in-test-name/test-each/sample.spec.js',
      code    : fs.readFileSync('./test/sample/exist-variable-in-test-name/test-each/sample.spec.js', 'utf-8')
    }
  ],
  invalid: [
    {
      filename: './test/sample/exist-variable-in-test-name/test-each/sample-error1.spec.js',
      code    : fs.readFileSync('./test/sample/exist-variable-in-test-name/test-each/sample-error1.spec.js', 'utf-8'),
      errors  : [{
        messageId: 'UndefinedVariables'
      }]
    }
  ]
});

ruleTester.run('jest-test-each-formatting/exist-variable-in-test-function/test-each', existVariableInTestFunction, {
  valid: [
    {
      filename: './test/sample/exist-variable-in-test-function/test-each/sample.spec.js',
      code    : fs.readFileSync('./test/sample/exist-variable-in-test-function/test-each/sample.spec.js', 'utf-8')
    }
  ],
  invalid: [
    {
      filename: './test/sample/exist-variable-in-test-function/test-each/sample-error1.spec.js',
      code    : fs.readFileSync('./test/sample/exist-variable-in-test-function/test-each/sample-error1.spec.js', 'utf-8'),
      errors  : [{
        messageId: 'UndefinedVariables'
      }]
    }
  ]
});
