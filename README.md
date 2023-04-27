# eslint-plugin-jest-test-each-formatting

*(\. |_)(test|spec). ESLint plugin that allows automatic formatting of templates when TaggedTemplate format of test.each in (js|jsx|ts|tsx) files.

[![Publish To npm](https://github.com/AkasakiTomohiro/eslint-plugin-jest-test-each-formatting/actions/workflows/publish-to-npm.yaml/badge.svg)](https://github.com/AkasakiTomohiro/eslint-plugin-jest-test-each-formatting/actions/workflows/publish-to-npm.yaml)
[![downloads](https://img.shields.io/npm/dm/eslint-plugin-jest-test-each-formatting.svg?style=flat-square)](http://npm-stat.com/charts.html?package=eslint-plugin-jest-test-each-formatting&from=2023-04-01)
[![MIT License](https://img.shields.io/npm/l/eslint-plugin-jest-test-each-formatting.svg?style=flat-square)](https://github.com/AkasakiTomohiro/eslint-plugin-jest-test-each-formatting/blob/master/LICENSE.md)

## Support Jest *.each

- describe.each
- describe.only.each
- describe.skip.each
- test.concurrent.each
- test.concurrent.failing.each
- test.concurrent.only.each
- test.concurrent.skip.each
- test.each
- test.failing.each
- test.only.each
- test.skip.each

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
    "jest-test-each-formatting/format": ["error", {
      "indent"        : 4
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
- [exist-variable-in-test-name](docs/exist-variable-in-test-name.md)
- [exist-variable-in-test-function](docs/exist-variable-in-test-function.md)
