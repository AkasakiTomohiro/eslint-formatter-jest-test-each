describe.each`
  details
  ${'aaa'}
  ${'bbbb'}
  ${'c'}
  ${'ddddd'}
`('sample', ({ details }) => {
  it(`${details}`, () => {
    console.log(details, expectValue, obj, text);
    expect(true).toBe(true);
  });
});

