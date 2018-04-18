var path = require('path')
var webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: process.env.NODE_ENV === 'production' ? './src/vue-bigdata-table/index.js' : './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: process.env.NODE_ENV === 'production' ? 'vue-bigdata-table.min.js' : 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
            use: ['css-loader?minimize', 'autoprefixer-loader', 'less-loader'],
            fallback: 'style-loader'
        })
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
            loaders: {
                css: 'vue-style-loader!css-loader',
                less: 'vue-style-loader!css-loader!less-loader'
            },
            postLoaders: {
                html: 'babel-loader'
            }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new ExtractTextPlugin('./vue-bigdata-table.css', {
      allChunks: true
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //     async: true,
    //     children: true,
    //     minChunks: 1
    // })
  ])
}
