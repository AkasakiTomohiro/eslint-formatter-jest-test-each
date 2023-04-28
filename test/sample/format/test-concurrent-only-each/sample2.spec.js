describe('sample', () => {
  test.concurrent.only.each`
    details
    ${'aaa'}
    ${'bbbb'}
    ${'c'}
    ${'ddddd'}
  `('sample', ({}) => {
    expect(true).toBe(true);
  });
});
