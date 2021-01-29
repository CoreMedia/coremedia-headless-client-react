module.exports = {
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  extends: [
    "plugin:react/recommended", // Uses the recommended rules from @eslint-plugin-react
    "plugin:@typescript-eslint/recommended", // Uses the recommended rules from @typescript-eslint/eslint-plugin
    "prettier/@typescript-eslint", // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    "plugin:prettier/recommended", // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
    project: "./tsconfig.json",
    tsconfigRootDir: "./",
  },
  settings: {
    react: {
      version: "detect", // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
  ignorePatterns: [
    "__downloaded__/",
    "__generated__/",
    "bin/",
    "public/",
    "node_nodules/",
    "*.config.js"
  ],
  rules: {
    "react/prop-types": "off",
    "@typescript-eslint/camelcase": "off", // disable for generated interfaces by apollo
    "@typescript-eslint/no-explicit-any" : "off", //disable for CI
    "@typescript-eslint/explicit-module-boundary-types": "off" //disable for CI
  },
};
