import { format } from './format';

export const rules = {
  'jest-test-each-formatting/format': format
};

export const config = {
  recommended: {
    plugins  : ['jest-test-each-formatting'],
    overrides: [
      {
        files: [
          '*.test.*', 
          '*_test.*', 
          '*.spec.*',
          '*_spec.*',
          '**/__tests__/*'
        ],
        rules: { 
          'jest-test-each-formatting/format': ['warn', {
            lineBreakStyle: 'unix',
            indent        : 4
          }]
        }
      }
    ]
  },
  strict: {
    plugins  : ['jest-test-each-formatting'],
    overrides: [
      {
        files: [
          '*.test.*', 
          '*_test.*', 
          '*.spec.*',
          '*_spec.*',
          '**/__tests__/*'
        ],
        rules: { 
          'jest-test-each-formatting/format': ['error', {
            lineBreakStyle: 'unix',
            indent        : 4
          }]
        }
      }
    ]
  }
};
