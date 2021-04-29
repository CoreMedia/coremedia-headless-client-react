module.exports = {
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  extends: [
    "react-app",
    "plugin:react/recommended", // Uses the recommended rules from @eslint-plugin-react
    "plugin:@typescript-eslint/recommended", // Uses the recommended rules from @typescript-eslint/eslint-plugin
    "plugin:prettier/recommended", // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  parserOptions: {
    ecmaVersion: 2021, // Allows for the parsing of modern ECMAScript features
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
    "*.config.js",
    ".eslintrc.js"
  ],
  rules: {
    "import/no-anonymous-default-export": [2, {"allowArrowFunction": true}], // used in queries
    "react/prop-types": "off",
    "@typescript-eslint/camelcase": "off", // disable for generated interfaces by apollo
    "@typescript-eslint/no-explicit-any" : "off", //disable for CI
    "@typescript-eslint/explicit-module-boundary-types": "off" //disable for CI
  },
};
