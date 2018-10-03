const fs = require('fs')
const path = require('path')

const root = fs.realpathSync(process.cwd())

console.log('+++ @material')

module.exports = {
  test: /\.js$/,
  include: [path.join(root, 'node_modules', '@material')],
  loader: 'babel-loader'
}
