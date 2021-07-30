module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base', 'plugin:security/recommended'],
  plugins: ['security'],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'no-restricted-syntax': [
      'error',
      'ForInStatement',
      'LabeledStatement',
      'WithStatement',
    ],
    'no-unused-expressions': ['warn', { allowTernary: true }],
    'no-return-await': 'off',
  },
};
