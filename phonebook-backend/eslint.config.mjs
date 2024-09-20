import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import stylistic from "@stylistic/eslint-plugin";
import globals from "globals";

export default tseslint.config({
  files: ["**/*.ts"],

  extends: [eslint.configs.recommended, ...tseslint.configs.recommendedTypeChecked],

  languageOptions: {
    parserOptions: {
      project: true,
      tsconfigRootDir: import.meta.dirname,
    },
    globals: {
      ...globals.node,
    },
    ecmaVersion: "latest",
  },

  plugins: {
    "@stylistic": stylistic,
  },

  ignores: ["dist/**", "build/**"],

  rules: {
    // ESLint rules
    eqeqeq: "error",
    "no-trailing-spaces": "error",
    "object-curly-spacing": ["error", "always"],
    "arrow-spacing": ["error", { before: true, after: true }],
    "no-console": "off",

    // TypeScript rules
    "@typescript-eslint/no-unsafe-assignment": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "@typescript-eslint/restrict-template-expressions": 0,
    "@typescript-eslint/restrict-plus-operands": 0,
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: false,
      },
    ],

    // Stylistic rules
    "@stylistic/semi": "error",
    "@stylistic/indent": ["error", 2],
    "@stylistic/linebreak-style": ["error", "unix"],
    "@stylistic/quotes": ["error", "double"],
    "@stylistic/semi": ["error", "always"],
  },
});
