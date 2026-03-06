import js from '@eslint/js';
import globals from 'globals';
import reactPlugin from 'eslint-plugin-react';
import prettierConfig from 'eslint-config-prettier';

export default [
  // 1. Ignore the 'dist' folder (so we don't see those Webpack warnings)
  {
    ignores: ['dist/**'],
  },

  // 2. Main configuration for your JavaScript files
  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      react: reactPlugin,
    },
    languageOptions: {
      // Enable browser globals (prevents errors for 'document', 'window', etc.)
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // Use the standard recommended rules
      ...js.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,

      // Custom tweaks
      'no-unused-vars': 'warn', // Marks variables like 'format' as warnings
      'no-undef': 'error', // Errors if you use something not defined
    },
    settings: {
      react: {
        version: 'detect', // Tries to find React version automatically
      },
    },
  },

  // 3. The Peace Treaty: MUST be the last item in the array
  // This turns off all rules that would conflict with Prettier
  prettierConfig,
];
