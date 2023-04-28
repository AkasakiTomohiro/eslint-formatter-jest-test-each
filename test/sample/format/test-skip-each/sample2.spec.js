describe('sample', () => {
  test.skip.each`
    details
    ${'aaa'}
    ${'bbbb'}
    ${'c'}
    ${'ddddd'}
  `('sample', ({}) => {
    expect(true).toBe(true);
  });
});
