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
