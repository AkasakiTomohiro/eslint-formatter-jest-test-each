import { describeEach } from './describe-each';
import { describeOnlyEach } from './describe-only-each';
import { testConcurrentEach } from './test-concurrent-each';
import { testConcurrentOnlyEach } from './test-concurrent-only-each';
import { testConcurrentSkipEach } from './test-concurrent-skip-each';
import { testEach } from './test-each';
import { testFailingEach } from './test-failing-each';
import { testOnlyEach } from './test-only-each';
import { testSkipEach } from './test-skip-each';

export const existVariableInTestFunctionTestData = {
  valid: [
    ...describeEach.valid,
    ...describeOnlyEach.valid,
    ...testConcurrentEach.valid,
    ...testConcurrentOnlyEach.valid,
    ...testConcurrentSkipEach.valid,
    ...testEach.valid,
    ...testFailingEach.valid,
    ...testOnlyEach.valid,
    ...testSkipEach.valid
  ],
  invalid: [
    ...describeEach.invalid,
    ...describeOnlyEach.invalid,
    ...testConcurrentEach.invalid,
    ...testConcurrentOnlyEach.invalid,
    ...testConcurrentSkipEach.invalid,
    ...testEach.invalid,
    ...testFailingEach.invalid,
    ...testOnlyEach.invalid,
    ...testSkipEach.invalid
  ]
};
