import { existVariableInTestName } from './exist-variable-in-test-name';
import { format } from './format';

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
          'jest-test-each-formatting/format'                     : 'warn',
          'jest-test-each-formatting/exist-variable-in-test-name': 'warn'
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
          'jest-test-each-formatting/format'                     : 'error',
          'jest-test-each-formatting/exist-variable-in-test-name': 'error'
        }
      }
    ]
  }
};
