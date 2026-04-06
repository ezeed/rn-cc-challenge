// Expo expects an explicit Babel config so Metro uses the Expo preset
// consistently during local development and native builds.
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};
