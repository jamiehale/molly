import { validate } from './validation';

test('validates empty descriptor', () => {
  validate({}, {}).then((value) => {
    expect(value).toStrictEqual({});
  });
});
