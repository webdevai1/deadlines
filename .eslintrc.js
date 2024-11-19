module.exports = {
  env: {
    node: true,
  },
  extends: [
    "expo",
    "prettier",
    "plugin:perfectionist/recommended-natural-legacy",
  ],
  plugins: ["prettier", "perfectionist", "sonarjs"],
  rules: {
    "perfectionist/sort-exports": "error",
    "perfectionist/sort-imports": [
      "error",
      {
        type: "line-length",
      },
    ],
    "perfectionist/sort-jsx-props": "error",
    "perfectionist/sort-named-exports": "error",
    "perfectionist/sort-named-imports": "error",
    "perfectionist/sort-objects": "error",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
  },
};
