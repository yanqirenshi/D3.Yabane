const path = require('path');

module.exports = {
  entry: './src/d3.js-yabane.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  }
};
