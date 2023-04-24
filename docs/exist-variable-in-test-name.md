# exist-variable-in-test-name

Rule to check if the variable used for the test name in test.each exists in the header of TaggedTemplate.

Examples of incorrect code for this rule:

```js
describe('sample', () => {
  test.each`
    details    | expectValue | obj
    ${'aaa'}   | ${'aaa'}    | ${1}
    ${'bbbb'}  | ${'bbbb'}   | ${2}
    ${'c'}     | ${'c'}      | ${3}
    ${'ddddd'} | ${'ddddd'}  | ${4}
  `('$sampleText', ({}) => { // Error because sampleText is not defined in the header.
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
  `('$details', ({}) => {
    expect(true).toBe(true);
  });
});
