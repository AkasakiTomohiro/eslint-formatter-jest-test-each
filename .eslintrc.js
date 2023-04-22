module.exports = {
  parser : '@typescript-eslint/parser',
  extends: [
    'prettier',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript'
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType : 'module'
  },
  rules: {
    'prettier/prettier'    : 'off',
    'max-len'              : ['error', { 'code': 140, 'ignoreStrings': true, 'ignoreTemplateLiterals': true, 'ignoreRegExpLiterals': true, 'ignoreComments': true }],
    'array-bracket-spacing': ['error', 'never', { singleValue: false, arraysInArrays: false, objectsInArrays: false }],
    'object-curly-spacing' : ['error', 'always', { objectsInObjects: false }],
    'comma-dangle'         : ['error', 'never'],
    'comma-style'          : ['error', 'last'],
    'key-spacing'          : [
      'error',
      {
        'beforeColon': false,
        'afterColon' : true,
        'align'      : 'colon'
      }
    ],
    'keyword-spacing'            : ['error', { 'before': true, 'after': true, 'overrides': { 'if': { 'after': false }, 'for': { 'after': false }, 'while': { 'after': false }, 'switch': { 'after': false }}}],
    'space-before-function-paren': ['error', { 'anonymous': 'never', 'named': 'never', 'asyncArrow': 'always' }],
    'node/no-extraneous-import'  : 'off',
    'no-console'                 : process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger'                : process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'quotes'                     : ['error', 'single'],
    'indent'                     : ['error', 2],
    'semi'                       : ['error', 'always'],
    'semi-spacing'               : ['error', { 'before': false, 'after': true }],
    'comma-spacing'              : ['error', { 'before': false, 'after': true }],
    'semi-style'                 : ['error', 'last'],
    'no-extra-semi'              : 'error',
    'space-infix-ops'            : 'error',
    'no-unexpected-multiline'    : 'error',
    'no-unreachable'             : 'error',
    'template-curly-spacing'     : ['error', 'never'],
    'space-before-blocks'        : ['error', 'always'],
    'computed-property-spacing'  : 'error',
    'no-var'                     : 'error',
    'one-var'                    : ['error', 'never'],
    'no-unsafe-finally'          : 'error',
    'no-throw-literal'           : 'error',
    'eqeqeq'                     : ['error', 'always'],
    'curly'                      : ['error', 'all'],
    'brace-style'                : ['error', '1tbs'],
    'eol-last'                   : ['error', 'always'],
    'no-multiple-empty-lines'    : ['error', { max: 1 }],
    'no-nested-ternary'          : 'error',
    'block-spacing'              : ['error', 'always'],
    'block-scoped-var'           : 'error',
    'rest-spread-spacing'        : 'error',
    'no-case-declarations'       : 'off',
    'constructor-super'          : 'error',
    'no-return-await'            : 'error',
    'new-parens'                 : 'error',
    'prefer-const'               : 'error',
    'no-duplicate-case'          : 'error',
    'use-isnan'                  : 'error',
    'guard-for-in'               : 'error',
    'no-multi-spaces'            : 'error',
    'no-native-reassign'         : 'error',
    'no-new-func'                : 'error',
    'no-new-wrappers'            : 'error',
    'no-fallthrough'             : 'error',
    'accessor-pairs'             : 'error',
    'no-implicit-coercion'       : 'error',
    'no-loop-func'               : 'error',
    'no-invalid-this'            : 'error',
    'no-alert'                   : 'error',
    'no-floating-decimal'        : 'error',
    'no-new'                     : 'error',
    'no-caller'                  : 'error',
    'no-constant-condition'      : 'error',
    'radix'                      : 'error',
    'no-octal-escape'            : 'error',
    'no-octal'                   : 'error',
    'spaced-comment'             : 'error',
    'lines-around-comment'       : [
      'error',
      {
        beforeBlockComment: true,
        afterBlockComment : false,
        beforeLineComment : true,
        afterLineComment  : false,
        allowClassStart   : false
      }
    ],
    'require-jsdoc': ['error', {
      'require': {
        'FunctionDeclaration'    : true,
        'MethodDefinition'       : true,
        'ClassDeclaration'       : false,
        'ArrowFunctionExpression': false,
        'FunctionExpression'     : false
      }
    }],
    'multiline-comment-style' : ['error', 'starred-block'],
    'complexity'              : ['error', { 'max': 20 }],
    'dot-location'            : ['error', 'property'],
    'no-redeclare'            : 'error',
    'yoda'                    : 'off',
    'sort-imports'            : 'off',
    'import/no-default-export': 'error'
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: './tsconfig.json'
      }
    }
  }
};
