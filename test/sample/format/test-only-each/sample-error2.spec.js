describe('sample', () => {
  test.only.each`
    details    | expectValue  | obj
    ${'aaa'}   | ${'aaa'}     | ${1}
    ${'bbbb'}  | ${'bbbb'}    | ${() => ''}
    ${'c'}     | ${'c'}       | ${() => ({ a: 1, b: 2 })}
    ${'ddddd'} | ${'ddddd'}   |
  `('sample', ({}) => {
    expect(true).toBe(true);
  });
});
