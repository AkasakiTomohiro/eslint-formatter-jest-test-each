# eslint-plugin-jest-test-each-formatting

*(\. |_)(test|spec). ESLint plugin that allows automatic formatting of templates when TaggedTemplate format of test.each in (js|jsx|ts|tsx) files.

## Installation

1. npm install -D eslint 
2. npm install -D eslint-plugin-jest-test-each-formatting 

```cmd
npm install -D eslint
npm install -D eslint-plugin-jest-test-each-formatting
```

## Usage

Add `jest-test-each-formatting` to the plugins section of your `.eslintrc` configuration file.

```json
{
  "plugins": ["jest-test-each-formatting"]
}
```

Next, configure the rules in the rules section.

```json
{
  "rules": {
    // デフォルトの設定
    "jest-test-each-formatting/format": ["error", {
      "lineBreakStyle": "unix",   // 改行コードの種類を規定
      "indent"        : 4         // インデントの数
    }]
  }
}
```

__or__

You can use `recommended` to activate the rule.

```json
{
  "extends": ["plugin:jest-test-each-formatting/recommended"]
}
```

It also supports a `strict` setting to enable strict rules.

```json
{
  "extends": ["plugin:jest-test-each-formatting/strict"]
}
```

## Rule Details

- [format](docs/format.md)
