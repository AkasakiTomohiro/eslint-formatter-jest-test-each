import { testEach } from './test-each';
import { testFailingEach } from './test-failing-each';
import { testOnlyEach } from './test-only-each';

export const existVariableInTestFunctionTestData = {
  valid: [
    ...testEach.valid,
    ...testFailingEach.valid,
    ...testOnlyEach.valid
  ],
  invalid: [
    ...testEach.invalid,
    ...testFailingEach.invalid,
    ...testOnlyEach.invalid
  ]
};
