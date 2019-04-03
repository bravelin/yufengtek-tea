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
                target: 'https://tea.yufengtek.com/tea-IIS-Web/bigdata',
                changeOrigin: true,
                pathRewrite: {
                    '^/bigdata': ''
                }
            },
            '/data': {
                target: 'https://tea.yufengtek.com/tea-IIS-Web/data',
                changeOrigin: true,
                pathRewrite: {
                    '^/data': ''
                }
            }
        },
    }
}
