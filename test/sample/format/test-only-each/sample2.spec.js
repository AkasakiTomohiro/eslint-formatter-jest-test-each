describe('sample', () => {
  test.only.each`
    details
    ${'aaa'}
    ${'bbbb'}
    ${'c'}
    ${'ddddd'}
  `('sample', ({}) => {
    expect(true).toBe(true);
  });
});
