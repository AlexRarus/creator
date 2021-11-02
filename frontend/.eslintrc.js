module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react-hooks'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  settings: {
    react: {
      pragma: 'React',
      // Pragma to use, default to "React"
      version: 'detect',
      // React version. "detect" automatically picks the version you have installed.
      // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
      // default to latest and warns if missing
      // It will default to "detect" in the future
    },
  },
  rules: {
    'react/no-unescaped-entities': 0,
    'react/display-name': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 0,
    'sort-keys': 0,
    'sort-imports': 0,
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
      },
    ],
    'import/no-unresolved': 0,
    'import/no-anonymous-default-export': [
      'error',
      {
        allowObject: true,
        allowArrowFunction: true,
      },
    ],

    'no-case-declarations': 0,
    'no-unused-expression': 0,
    'no-var-requires': 0,
    'no-unexpected-multiline': 0,
    'no-shadowed-variable': 0,
    'no-string-literal': 0,
    'no-empty-interface': 0,

    'import/named': 0,
    'import/no-duplicates': 1,
    '@typescript-eslint/no-non-null-assertion': 1,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        args: 'none',
      },
    ],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-var-requires': 'off',

    'member-ordering': 0,
    'member-access': 0,

    'react-hooks/rules-of-hooks': 0,
    'react-hooks/exhaustive-deps': 0,
    'react/jsx-tag-spacing': [
      2,
      {
        closingSlash: 'never',
        beforeSelfClosing: 'always',
        afterOpening: 'allow-multiline',
      },
    ],
    'react/jsx-no-lambda': 0,
    'react/prop-types': 0,
    'react/jsx-boolean-value': ['error', 'always'],
    'react/jsx-wrap-multilines': [
      'error',
      {
        declaration: 'parens-new-line',
        assignment: 'parens-new-line',
        return: 'parens-new-line',
        arrow: 'parens-new-line',
        condition: 'parens-new-line',
        logical: 'parens-new-line',
        prop: 'ignore',
      },
    ],
    'react/self-closing-comp': [
      'error',
      {
        component: true,
        html: true,
      },
    ],
    'react/jsx-key': 'error',
  },
};
