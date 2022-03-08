const config = require("@start-packages/eslint-typescript");

module.exports = {
  ...config,
  ignorePatterns: [...config.ignorePatterns, "shell-plugin.js", "scripts/**"],
};
