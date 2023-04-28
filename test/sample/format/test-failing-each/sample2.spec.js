describe('sample', () => {
  test.failing.each`
    details
    ${'aaa'}
    ${'bbbb'}
    ${'c'}
    ${'ddddd'}
  `('sample', ({}) => {
    expect(true).toBe(true);
  });
});
