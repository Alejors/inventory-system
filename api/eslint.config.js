const { js } = require("@eslint/js");
const globals = require("globals");


module.exports = [
  {
    files: ["**/*.{js,mjs,cjs}"],
    ...js,
  },
  {
    files: ["**/*.js"],
    languageOptions: { sourceType: "commonjs" },
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: { globals: globals.browser },
  },
];