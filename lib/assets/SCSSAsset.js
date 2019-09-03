const { Asset } = require('parcel-bundler');
const _ = require('lodash');
const { flow, toPairs, groupBy, mapValues, map, reduce } = require('lodash/fp');
const { alphaWithoutLeadingZero } = require('../utils/utils');

const NAMESPACE = 'ch';

class SCSSAsset extends Asset {
  static parseStatic(src) {
    if (!src) { return [] }

    const parsedColors = flow(
      toPairs,
      mapValues(([name, info]) => ({ name, ...info })),
      groupBy('family'),
      toPairs,
    )(_.isString(src) ? JSON.parse(src) : src);

    const baseContents = flow(
      map(([family, colors]) => {
        return ([
          family,
          _.map(colors, ({ name, rgb, opacity }) => {
            const styleName = `$${NAMESPACE}-${name}`;
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
    )(parsedColors);

    baseContents.push('');
    baseContents.push('/* Exports for using in JS. */');
    baseContents.push(':export {');
    const exportContents = flow(
      map(([family, colors]) => {
        return ([
          family,
          _.map(colors, ({ name }) => {
            const styleName = `${_.toUpper(NAMESPACE)}_${_.toUpper(_.snakeCase(name))}`;
            const styleValue = `$${NAMESPACE}-${name}`;
            return [styleName, styleValue];
          }).map(([name, value]) => (`  ${name}: ${value};`)),
        ])
      }),
      reduce((buffer, [family, colors]) => {
        if (!_.isEmpty(buffer)) { buffer.push('') }
        buffer.push(`  /* ${family} */`);
        colors.forEach(x => buffer.push(x));
        return buffer;
      }, []),
    )(parsedColors);
    baseContents.push(exportContents);
    baseContents.push('}');

    return _.flatten(baseContents);
  }

  constructor(name, options) {
    super(name, options);
    this.type = 'scss';
  }

  parse(code) {
    return SCSSAsset.parseStatic(code);
  }

  async generate() {
    return this.ast.join('\n');
  }
}

module.exports = SCSSAsset;
