module.exports = function(bundler) {
  bundler.addAssetType('.json', require.resolve('./assets/ColorsJSONAsset.js'));
  bundler.addAssetType('.scss', require.resolve('./assets/SCSSAsset.js'));
  bundler.addAssetType('.css', require.resolve('./assets/CSSAsset.js'));
  bundler.addAssetType('.xml', require.resolve('./assets/AndroidXMLAsset.js'));
  bundler.addPackager('xml', require.resolve('./packagers/AndroidXMLPackager.js'));
};
