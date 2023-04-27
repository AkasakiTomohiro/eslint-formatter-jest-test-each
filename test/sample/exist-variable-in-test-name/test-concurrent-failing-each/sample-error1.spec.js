describe('sample', () => {
  test.concurrent.failing.each`
    details    | expectValue | obj
    ${'aaa'}   | ${'aaa'}    | ${1}
    ${'bbbb'}  | ${'bbbb'}   | ${() => ''}
    ${'c'}     | ${'c'}      | ${() => ({ a: 1, b: 2 })}
    ${'ddddd'} | ${'ddddd'}  | ${'ddddd'}
  `('[$a] Sample Test.($expectValue)', ({}) => {
    expect(true).toBe(true);
  });
});
