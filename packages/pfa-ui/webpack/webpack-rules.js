const path = require('path');
const helpers = require('./webpack-helpers');

module.exports = [
  {
    test: /\.(js|jsx)$/,
    exclude: /(node_modules)/,
    use: 'babel-loader',
  },
  {
    test: /\.(png|gif|jpg|svg)$/,
    include: [path.resolve(helpers.appsPath, 'modules')],
    use: 'file-loader?limit=20480&name=assets/[name]-[hash].[ext]',
  },
  {
    test: /\.woff$/,
    use: 'file-loader?limit=65000&mimetype=application/font-woff&name=assets/fonts/[name].[ext]',
  },
  {
    test: /\.woff2$/,
    use: 'file-loader?limit=65000&mimetype=application/font-woff2&name=assets/fonts/[name].[ext]',
  },
  {
    test: /\.[ot]tf$/,
    use: 'file-loader?limit=65000&mimetype=application/octet-stream&name=assets/fonts/[name].[ext]',
  },
  {
    test: /\.eot$/,
    use:
      'file-loader?limit=65000&mimetype=application/vnd.ms-fontobject&name=assets/fonts/[name].[ext]',
  },
  {
    test: /antd.*\.css$/,
    use: ['style-loader', 'css-loader', 'postcss-loader'],
  },
  {
    test: /\.css$/,
    exclude: /antd.*\.css$/,
    use: ['style-loader', 'css-loader', 'postcss-loader'],
  },
  {
    test: /\.less$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          modules: true,
          localIdentName: '[name]__[local]___[hash:base64:5]',
          camelCase: true,
        },
      },
      'postcss-loader',
      {
        loader: 'less-loader',
        options: {
          javascriptEnabled: true,
        },
      },
    ],
  },
  {
    test: /\.svg$/,
    use: 'file-loader?limit=65000&mimetype=image/svg+xml&name=assets/fonts/[name].[ext]',
    exclude: [path.resolve(helpers.appsPath, 'icons')],
  },
  {
    test: /\.svg$/,
    loader: 'raw-loader',
    include: [path.resolve(helpers.appsPath, 'icons')],
  },
  {
    test: /\.html?$/,
    use: ['html-loader'],
  },
];
