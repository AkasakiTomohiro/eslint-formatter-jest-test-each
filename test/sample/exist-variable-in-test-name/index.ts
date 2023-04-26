import { testEach } from './test-each';
import { testFailingEach } from './test-failing-each';
import { testOnlyEach } from './test-only-each';
import { testSkipEach } from './test-skip-each';

export const existVariableInTestNameTestData = {
  valid: [
    ...testEach.valid,
    ...testFailingEach.valid,
    ...testOnlyEach.valid,
    ...testSkipEach.valid
  ],
  invalid: [
    ...testEach.invalid,
    ...testFailingEach.invalid,
    ...testOnlyEach.invalid,
    ...testSkipEach.invalid
  ]
};
