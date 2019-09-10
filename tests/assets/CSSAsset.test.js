const Asset = require('../../lib/assets/CSSAsset.js');
const src = require('../test.colors.json');

describe('CSSAsset Test', () => {
  test('Should return converted string array when src is valid JSON.', () => {
    const result = Asset.parseStatic(src);
    const expectation = [
      '/* foo */',
      '--foo-70: rgba(0, 0, 0, .7);',
      '--foo-50: rgba(0, 0, 0, .5);',
      '',
      '/* bar */',
      '--bar-100: rgba(255, 255, 255, 1);',
    ];

    expect(result).toEqual(expectation);
  });

  test('Return empty array when src is falsy.', () => {
    const result = Asset.parseStatic();
    const expectation = [];
    expect(result).toEqual(expectation);
  });
});
