describe('sample', () => {
  test.each`
    details    | expectValue | obj
    ${'aaa'}   | ${'aaa'}    | ${1}
    ${'bbbb'}  | ${'bbbb'}   | ${() => ''}
    ${'c'}     | ${'c'}      | ${() => ({ a: 1, b: 2 })}
    ${'ddddd'} | ${'ddddd'}  | ${'ddddd'}
  `('Sample Test.', ({ details, expectValue, obj }) => {
    console.log(details, expectValue, obj);
    expect(true).toBe(true);
  });
});
