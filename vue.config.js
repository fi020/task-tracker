// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })




// const { defineConfig } = require('@vue/cli-service')

// module.exports = defineConfig({
//   transpileDependencies: true,
//   chainWebpack: config => {
//     config.plugin('define').tap(definitions => {
//       definitions[0]['__VUE_PROD_HYDRATION_MISMATCH_DETAILS__'] = JSON.stringify('false');
//       return definitions;
//     });
//   },
// })






// const { defineConfig } = require('@vue/cli-service')

// module.exports = defineConfig({
//   transpileDependencies: true,
//   configureWebpack: {
//     plugins: [
//       new (require('webpack')).DefinePlugin({
//         __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify('false')
//       })
//     ]
//   }
// })









const { defineConfig } = require('@vue/cli-service');
const webpack = require('webpack');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify('false')
      })
    ]
  }
});
