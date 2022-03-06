const getConfig = require("@start-packages/webpack-typescript-node");

module.exports = async (...args) => {
  const config = await getConfig(...args);

  config.module.rules = [
    ...config.module.rules,
    {
      test: /\.(ts|tsx|js|jsx)?$/,
      loader: "ts-loader",
    },
  ];

  config.output = {
    ...config.output,
    library: "webpackNumbers",
    libraryTarget: "umd",
  };

  return config;
};
