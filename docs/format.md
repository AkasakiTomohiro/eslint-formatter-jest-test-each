# format

This rule forces the alignment of `|` in the TaggedTemplate format table in test.each.

Examples of incorrect code for this rule:

```js
describe('sample', () => {
  test.each`
    details | expectValue | obj
    ${'aaa'} | ${'aaa'} | ${1}
    ${'bbbb'} | ${'bbbb'} | ${2}
    ${'c'} | ${'c'} | ${3}
    ${'ddddd'} | ${'ddddd'} | ${4}
  `('sample', ({}) => {
    expect(true).toBe(true);
  });
});
```

Examples of correct code for this rule:

```js
describe('sample', () => {
  test.each`
    details    | expectValue | obj
    ${'aaa'}   | ${'aaa'}    | ${1}
    ${'bbbb'}  | ${'bbbb'}   | ${2}
    ${'c'}     | ${'c'}      | ${3}
    ${'ddddd'} | ${'ddddd'}  | ${4}
  `('sample', ({}) => {
    expect(true).toBe(true);
  });
});
```

## Options

- lineBreakStyle

  If you are enforcing line break codes by specifying [linebreak-style](https://eslint.org/docs/latest/rules/linebreak-style#rule-details), please set this setting.  

  default: Automatic selection according to require("os").EOL

  - "unix" (default) enforces the usage of Unix line endings: \n for LF.
  - "windows" enforces the usage of Windows line endings: \r\n for CRLF.

- indent

  If you are enforcing the number of indentations by specifying [indent](https://eslint.org/docs/latest/rules/indent), please set this setting.

  default: 4

- eastAsianWidth

  [Unicode East Asian Width (EAW)](http://www.unicode.org/reports/tr11/).
  Computes the width of a string based on the [EAW properties](http://www.unicode.org/reports/tr11/) of the characters. 
  By default, characters with property Wide (W) or Fullwidth (F) are treated as wide (= 2) and others are as narrow (= 1).

  ```json
  {
    eastAsianWidth: {
      N : 1,
      Na: 1,
      W : 2,
      F : 2,
      H : 1,
      A : 1
    }
  }
  ```
