const path = require('path');
module.exports = {
  env: {
    NODE_ENV: '"production"'
  },
  defineConstants: {
  },
  alias: {
    '@/components': path.resolve(__dirname, '..', 'src/components'),
    '@/assets': path.resolve(__dirname, '..', 'src/assets'),
    '@/service': path.resolve(__dirname, '..', 'src/service'),
    '@/store': path.resolve(__dirname, '..', 'src/store'),
    '@/config': path.resolve(__dirname, '..', 'src/config'),
  },
  weapp: {
    module: {
      postcss: {
        // 小程序端样式引用本地资源内联
        url: {
          enable: true,
          limit: 102400000000
        }
      }
    }
  },
  h5: {}
}
