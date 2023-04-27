describe.skip.each`
  details    | expectValue | obj
  ${'aaa'}   | ${'aaa'}    | ${1}
  ${'bbbb'}  | ${'bbbb'}   | ${() => ''}
  ${'c'}     | ${'c'}      | ${() => ({ a: 1, b: 2 })}
  ${'ddddd'} | ${'ddddd'}  |
`('sample', ({ details }) => {
  it(`${details}`, () => {
    console.log(details, expectValue, obj, text);
    expect(true).toBe(true);
  });
});

