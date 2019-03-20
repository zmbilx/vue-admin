const path = require('path')

const resolve = dir => {
  return path.join(__dirname, dir)
}

// 项目部署目录，相对于根目录
const BASE_URL = process.env.NODE_ENV === 'production'
  ? ''
  : 'http://api.hardphp.com/index.php'

// 项目部署目录，相对于根目录
const WWW_ROOT = process.env.NODE_ENV === 'production'
  ? '/vue-admin/'
  : '/'

module.exports = {
  publicPath: WWW_ROOT,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule.use('svg-sprite-loader').loader('svg-sprite-loader').options({ symbolId: 'icon-[name]' })
  },
  // 打包时不生成.map文件
  productionSourceMap: false,
  // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
  devServer: {
    proxy: {
      '/': {
        target: BASE_URL, // 设置你调用的接口域名和端口号 别忘了加http
        changeOrigin: true,
        pathRewrite: {
          '^/': ''
        }
      }
    }
  }
}
