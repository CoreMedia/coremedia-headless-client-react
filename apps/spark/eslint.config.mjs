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
      "no-case-declarations": "off",
      "no-constant-binary-expression": "off",
      "no-empty-pattern": "off",
      "no-unused-vars": ["off", { "argsIgnorePattern": "_" }],
      "prettier/prettier": ["error", {"trailingComma": "es5"}],
      "@typescript-eslint/no-explicit-any" : "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-unused-vars": ["off", { "argsIgnorePattern": "_" }]
    },
  }
]);
