import eslint from '@eslint/js';
import {defineConfig, globalIgnores} from "eslint/config";
import typescriptParser from "@typescript-eslint/parser";
import eslintConfigPrettierFlat from "eslint-config-prettier/flat";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import typescriptEslint from "typescript-eslint";

export default defineConfig([
  globalIgnores([
    "__downloaded__/",
    "__generated__/",
    "dist",
  ]),
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      eslintConfigPrettierFlat,
      eslintPluginPrettierRecommended,
      typescriptEslint.configs.recommended,
    ],
    languageOptions: {
      parser: typescriptParser,
      ecmaVersion: "latest",
    },
    rules: {
      "prettier/prettier": ["error", {"trailingComma": "es5"}],
    }
  }
]);
