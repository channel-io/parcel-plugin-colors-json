module.exports = function(bundler) {
  bundler.addAssetType('.json', require.resolve('./assets/ColorsJSONAsset.js'));
  bundler.addAssetType('.scss', require.resolve('./assets/SCSSAsset.js'));
  bundler.addAssetType('.css', require.resolve('./assets/CSSAsset.js'));
  bundler.addAssetType('.xml', require.resolve('./assets/AndroidXMLAsset.js'));
  bundler.addPackager('json', require.resolve('./packagers/SimpleJSONPackager.js'));
  bundler.addPackager('scss', require.resolve('./packagers/SCSSPackager.js'));
  bundler.addPackager('xml', require.resolve('./packagers/AndroidXMLPackager.js'));
};
