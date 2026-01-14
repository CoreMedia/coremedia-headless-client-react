import eslint from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import typescriptEslint from 'typescript-eslint';
import typescriptParser from "@typescript-eslint/parser";
import importPlugin from "eslint-plugin-import";
import eslintPluginPrettierRecommended  from "eslint-plugin-prettier/recommended";

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      eslint.configs.recommended,
      importPlugin.flatConfigs.recommended,
      typescriptEslint.configs.recommended,
      importPlugin.flatConfigs.typescript,
      eslintPluginPrettierRecommended
    ],
    languageOptions: {
      parser: typescriptParser,
      ecmaVersion: 'latest',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "import/order": ["error"],
      "import/newline-after-import": ["error"],
      "prettier/prettier": ["error", {"trailingComma": "es5"}],
    },
  }
]);
