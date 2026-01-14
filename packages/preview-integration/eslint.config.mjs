import eslint from '@eslint/js';
import {defineConfig, globalIgnores} from "eslint/config";
import eslintConfigPrettierFlat from "eslint-config-prettier/flat";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import globals from "globals";

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ["**/*.js"],
    extends: [
      eslint.configs.recommended,
      eslintConfigPrettierFlat,
      eslintPluginPrettierRecommended
    ],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    rules: {
      "no-prototype-builtins": "off",
      "no-unused-vars": ["off", { "argsIgnorePattern": "_" }],
      "prettier/prettier": ["error", {"trailingComma": "es5"}],
    }
  }
]);


