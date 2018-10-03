module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  extends: [
    'standard'
  ],
  plugins: [
    'html'
  ],
  rules: {
    'generator-star-spacing': 'off',
    'no-console': 'off',
    'no-new': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  globals: {
    MDC: true,
    Pro: true
  }
}
