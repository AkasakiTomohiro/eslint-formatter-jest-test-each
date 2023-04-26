import { RuleTester } from 'eslint';

import { existVariableInTestFunction } from '../src/exist-variable-in-test-function';
import { existVariableInTestName } from '../src/exist-variable-in-test-name';
import { format } from '../src/format';
import { formatTestData } from './sample/format';
import { existVariableInTestNameTestData } from './sample/exist-variable-in-test-name';
import { existVariableInTestFunctionTestData } from './sample/exist-variable-in-test-function';

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6
  }
});

ruleTester.run('jest-test-each-formatting/format', format, formatTestData);

ruleTester.run('jest-test-each-formatting/exist-variable-in-test-name', existVariableInTestName, existVariableInTestNameTestData);

ruleTester.run('jest-test-each-formatting/exist-variable-in-test-function/test-each', existVariableInTestFunction, existVariableInTestFunctionTestData);
