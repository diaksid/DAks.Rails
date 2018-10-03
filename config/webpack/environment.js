const fs = require('fs')
const path = require('path')
const { environment } = require('@rails/webpacker')

const babel = environment.loaders.get('babel')
delete babel.exclude
babel.include = [
  path.join(fs.realpathSync(process.cwd()), 'node_modules', '@material'),
  path.join(fs.realpathSync(process.cwd()), 'lib', 'assets')
]
babel.use[0].options.babelrc = false
babel.use[0].options.presets = [
  ['@babel/preset-env', {
    modules: false,
    targets: {
      browsers: '> 1%',
      ie: 11
    },
    forceAllTransforms: true,
    useBuiltIns: 'usage'
  }]
]
babel.use[0].options.plugins = [
  // '@babel/plugin-transform-object-assign'
]

module.exports = environment
