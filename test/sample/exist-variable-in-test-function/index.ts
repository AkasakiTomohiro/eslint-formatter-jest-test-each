import { testEach } from './test-each';
import { testFailingEach } from './test-failing-each';

export const existVariableInTestFunctionTestData = {
  valid: [
    ...testEach.valid,
    ...testFailingEach.valid
  ],
  invalid: [
    ...testEach.invalid,
    ...testFailingEach.invalid
  ]
};
