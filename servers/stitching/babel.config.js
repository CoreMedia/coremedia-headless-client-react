module.exports = {
  plugins: [
    ["@babel/plugin-transform-typescript", { allowDeclareFields: true }],
    ["@babel/plugin-transform-parameters", { loose: true }],
    ["@babel/plugin-transform-computed-properties", { loose: true }],
    ["@babel/plugin-transform-shorthand-properties", { loose: true }],
    ["@babel/plugin-transform-arrow-functions", { spec: false }],
    ["@babel/plugin-transform-for-of", { assumeArray: true }],
  ],
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: 16,
        },
      },
    ],
    "@babel/preset-typescript",
  ],
};
