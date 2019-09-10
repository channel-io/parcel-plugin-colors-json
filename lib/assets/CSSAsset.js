const { Asset } = require('parcel-bundler');
const _ = require('lodash');
const { flow, toPairs, groupBy, mapValues, map, reduce, forEach } = require('lodash/fp');
const { alphaWithoutLeadingZero } = require('../utils/utils');

class CSSAsset extends Asset {
  static parseStatic(src) {
    const _buffer = [];

    if (src) {
      flow(
        toPairs,
        mapValues(([name, info]) => ({ name, ...info })),
        groupBy('family'),
        toPairs,
        map(([family, colors]) => {
          return ([
            family,
            _.map(colors, ({ name, rgb, opacity }) => {
              const styleName = `--${_.kebabCase(name)}`;
              const styleValue = `rgba(${rgb.split(',').join(', ')}, ${alphaWithoutLeadingZero(opacity)})`;
              return [styleName, styleValue];
            }).map(([name, value]) => (`${name}: ${value};`)),
          ])
        }),
        reduce((buffer, [family, colors]) => {
          if (!_.isEmpty(buffer)) { buffer.push('') }
          buffer.push(`/* ${family} */`);
          colors.forEach(x => buffer.push(x));
          return buffer;
        }, []),
        forEach(x => _buffer.push(x)),
      )(_.isString(src) ? JSON.parse(src) : src);
    }

    return _buffer;
  }

  constructor(name, options) {
    super(name, options);
    this.type = 'css';
  }

  parse(code) {
    return CSSAsset.parseStatic(code);
  }

  async generate() {
    return this.ast.join('\n');
  }
}

module.exports = CSSAsset;
