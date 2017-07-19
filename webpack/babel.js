// const ProvidePlugin = require('babel-runtime/core-js/promise')['default'];
// require('babel-runtime/core-js/promise')['default'] = require('bluebird');


// module.exports = function (paths) {
//   return {
//     module: {
//       rules: [
//         {
//           test: /\.js$/,
//           include: paths,
//           exclude: /(node_modules|bower_components)/,
//           use: {
//             loader: 'babel-loader',
//             options: {
//               presets: ['env'],
//               plugins: ['transform-runtime']
//             }
//           }
//         }
//       ]
//     },
//     plugins: [
//             new ProvidePlugin({
//             'Promise': 'bluebird'
//         }),
//         ],
//   };
// };


module.exports = function (paths) {
  return {
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        }
      ]
    }
  };
};