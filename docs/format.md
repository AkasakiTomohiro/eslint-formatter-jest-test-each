# format

This rule forces the alignment of `|` in the TaggedTemplate format table in test.each.

Examples of incorrect code for this rule:

```js
describe('sample', () => {
  test.each`
    details | expectValue | obj
    ${'aaa'} | ${'aaa'} | ${1}
    ${'bbbb'} | ${'bbbb'} | ${() => ''}
    ${'c'} | ${'c'} | ${() => ({ a: 1, b: 2 })}
    ${'ddddd'} | ${'ddddd'} | ${'ddddd'}
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
    ${'bbbb'}  | ${'bbbb'}   | ${() => ''}
    ${'c'}     | ${'c'}      | ${() => ({ a: 1, b: 2 })}
    ${'ddddd'} | ${'ddddd'}  | ${'ddddd'}
  `('sample', ({}) => {
    expect(true).toBe(true);
  });
});
```
