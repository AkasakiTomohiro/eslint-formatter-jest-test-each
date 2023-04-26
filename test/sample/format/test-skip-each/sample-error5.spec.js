describe('sample', () => {
  test.skip.each`
    details | expectValue | obj
    ${'aaa'} | ${'aaa'} | ${1}
    ${'bbbb'} | ${'bbbb'} | ${() => ''}
    ${'c'} | ${'c'} | ${() => ({ a: 1, b: 2 })}
    ${'ddddd'} | ${'ddddd'} | ${'ddddd'}
  `('sample', ({}) => {
    expect(true).toBe(true);
  });
});
