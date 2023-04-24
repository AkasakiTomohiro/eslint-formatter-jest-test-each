# exist-variable-in-test-function

Rules for checking whether a variable used as an argument to test.each function exists in TaggedTemplate.

Examples of incorrect code for this rule:

```js
describe('sample', () => {
  test.each`
    details    | expectValue | obj
    ${'aaa'}   | ${'aaa'}    | ${1}
    ${'bbbb'}  | ${'bbbb'}   | ${2}
    ${'c'}     | ${'c'}      | ${3}
    ${'ddddd'} | ${'ddddd'}  | ${4}
  `('$details', ({ sampleText }) => { // Error because sampleText is not defined in the header.
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
  `('$details', ({ details }) => {
    expect(true).toBe(true);
  });
});
