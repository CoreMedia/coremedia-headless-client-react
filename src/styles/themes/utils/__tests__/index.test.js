// @flow
import { media, getColors } from '..';

describe('getColors()', () => {
  const colors = {
    red: 'RED',
    black: 'BLACK',
    default: 'TRANSPARENT',
  };

  it(`should return matching value`, () => {
    const label = 'red';
    const expected = colors[label];
    const result = getColors(colors, label);
    expect(result).toEqual(expected);
  });
  it(`should return default value`, () => {
    const label = 'blue';
    const expected = colors.default;
    const result = getColors(colors, label);
    expect(result).toEqual(expected);
  });
  it(`should return default value`, () => {
    const label = undefined;
    const expected = colors.default;
    const result = getColors(colors, label);
    expect(result).toEqual(expected);
  });
});

describe('media[label]', () => {
  it('should return return a valid media query', () => {
    const result = media(400)`font-size: 1.2em`;
    expect(result).toMatchSnapshot();
  });
});
