module.exports = {
  extends: ["plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
  },
  ignorePatterns: ["dist", "node_nodules/", "*.css"],
  rules: {
    "prettier/prettier": ["error", { trailingComma: "es5" }],
  },
};
