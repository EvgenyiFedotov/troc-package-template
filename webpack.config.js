const path = require("path");

const getConfig = require("@start-packages/webpack-typescript-node");

const ShellPlugin = require("./shell-plugin");

module.exports = async (...args) => {
  const config = await getConfig(...args);

  config.entry = {
    ...config.entry,
    cli: path.resolve(__dirname, "./src/cli"),
  };

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

  config.plugins = [new ShellPlugin("emit", "node ./scripts/after-build.js")];

  return config;
};
