const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const context = path.resolve(__dirname, 'assets');

module.exports = {
  context,
  devServer: {
    contentBase: path.join('./src'),
    compress: true,
    port: 9000,
  },
  entry: {
    bundle: './js/index.js',
    'main.css': './scss/main.scss',
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '~': './assets/js',
    },
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist/assets'),
    publicPath: '/assets/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
              ],
              plugins: [
                '@babel/plugin-syntax-dynamic-import',
                [
                  '@babel/plugin-transform-runtime',
                  {
                    'corejs': false,
                    'helpers': true,
                    'regenerator': true,
                    'useESModules': false
                  }
                ]
              ]
            },
          },
          {
            loader: 'eslint-loader',
          },
        ],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75,
              },
            },
          },
        ],
      },
      {
        test: /\.scss/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(svg|woff|eot|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: 'style-loader',
          },
          'css-loader',
        ]
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name]',
    }),
    new CopyWebpackPlugin(
      [
        { from: 'img', to: 'img' },
        { from: 'fonts', to: 'fonts' },
        { from: 'js/categories', to: 'js/categories' }
      ],
      { context }
    ),
    new HtmlWebpackPlugin({
      template: path.resolve('./src/index.html')
    })
  ],
};
