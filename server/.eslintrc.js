module.exports = {
  env: {
    node: true,
    commonjs: true,
    es6: true,
  },
  extends: 'eslint:recommended',
  plugins: ['node'],
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'node/no-unsupported-features/es-syntax': ['error', { ignores: ['modules'] }],
    'node/no-missing-import': 'error',
    'node/no-missing-require': 'error',
    'node/no-unpublished-require': 'off',
    'node/no-unsupported-features/node-builtins': 'error',
    'no-unused-vars': 'off'
  },
}
