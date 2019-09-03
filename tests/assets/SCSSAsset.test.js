const Asset = require('../../lib/assets/SCSSAsset.js');
const src = require('../test.colors.json');

describe('SCSSAsset Test', () => {
  test('Should return converted string array when src is valid JSON.', () => {
    const parsedSCSS = Asset.parseStatic(src);
    const expectation = [
      '/* foo */',
      '$ch-foo70: rgba(0, 0, 0, .7);',
      '$ch-foo50: rgba(0, 0, 0, .5);',
      '',
      '/* bar */',
      '$ch-bar100: rgba(255, 255, 255, 1);',
      '',
      '/* Exports for using in JS. */',
      ':export {',
      '  /* foo */',
      '  CH_FOO_70: $ch-foo70;',
      '  CH_FOO_50: $ch-foo50;',
      '',
      '  /* bar */',
      '  CH_BAR_100: $ch-bar100;',
      '}'
    ];

    expect(parsedSCSS).toEqual(expectation);
  });

  test('Return empty array when src is falsy.', () => {
    const result = Asset.parseStatic();
    const expectation = [];
    expect(result).toEqual(expectation);
  });
});
