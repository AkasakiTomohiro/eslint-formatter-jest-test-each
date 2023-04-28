describe('sample', () => {
  test.concurrent.skip.each`
    details
    ${'aaa'}
    ${'bbbb'}
    ${'c'}
    ${'ddddd'}
  `('sample', ({}) => {
    expect(true).toBe(true);
  });
});
