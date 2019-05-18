const CompressionPlugin = require('compression-webpack-plugin')
module.exports = {
    publicPath: process.env.NODE_ENV === 'development' ? './' : './',
    // outputDir: '../server/app/public/u/',
    assetsDir: '',
    productionSourceMap: false,
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            return {
                // plugins: [new CompressionPlugin({
                //     test: /\.js$|\.html$|\.css/,
                //     threshold: 10240,
                //     deleteOriginalAssets: false
                // })]
            }
        }
    },
    devServer: {
        port: 8066,
        https: false,
        hotOnly: false,
        disableHostCheck: true,
        proxy: {
            '/bigdata': {
                // target: 'http://192.168.2.117:8080/tea_Web_Bigdata_war/bigdata/',
                // target: 'http://tea.yufengtek.com/tea-Web-Bigdata/bigdata/',
                target: 'http://192.168.2.114:10013/bigdata/',
                changeOrigin: true,
                pathRewrite: {
                    '^/bigdata': ''
                }
            },
            '/data': {
                // target: 'http://192.168.2.117:8080/tea_Web_Bigdata_war/data/',
                // target: 'http://tea.yufengtek.com/tea-Web-Bigdata/data/',
                target: 'http://192.168.2.114:10013/data/',
                changeOrigin: true,
                pathRewrite: {
                    '^/data': ''
                }
            }
        },
    }
}
