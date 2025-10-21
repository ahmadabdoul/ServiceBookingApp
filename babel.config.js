// babel.config.js
module.exports = function (api) {
    api.cache(true);
    return {
      presets: ["babel-preset-expo"],
      plugins: [
        // Plugin for NativeWind (Tailwind CSS)
        "nativewind/babel",
        
        // Plugin for Reanimated - this must be the last plugin in the array.
        "react-native-reanimated/plugin",
      ],
    };
  }; 