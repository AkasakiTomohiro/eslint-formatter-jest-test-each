import { format, defaultOptions } from './format';

export const rules = {

  // テンプレートブロックの幅を揃えるルール
  'format': format,

  // テスト名に利用している変数がTaggedTemplateに存在するかチェックするルール
  'exist-variable-in-test-name': existVariableInTestName
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
