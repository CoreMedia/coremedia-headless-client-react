import eslint from '@eslint/js';
import {defineConfig, globalIgnores} from "eslint/config";
import eslintConfigPrettierFlat from "eslint-config-prettier/flat";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import globals from "globals";

export default defineConfig([
  globalIgnores(['dist', 'test/mocks']),
  {
    files: ["**/**.js"],
    extends: [
      eslint.configs.recommended,
      eslintConfigPrettierFlat,
      eslintPluginPrettierRecommended
    ],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.jest
      }
    },
    rules: {
      "prettier/prettier": ["error", {"trailingComma": "es5"}],
    }
  }
]);

