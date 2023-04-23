import { format, defaultOptions } from './format';

export const rules = {

  // テンプレートブロックの幅を揃えるルール
  'format': format
};

export const configs = {
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
          'jest-test-each-formatting/format': ['warn', defaultOptions]
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
          'jest-test-each-formatting/format': ['error', defaultOptions]
        }
      }
    ]
  }
};
