const CompressionPlugin = require('compression-webpack-plugin')
module.exports = {
    baseUrl: process.env.NODE_ENV === 'development' ? './' : './',
    // outputDir: '../server/app/public/u/',
    assetsDir: '',
    productionSourceMap: false,
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            return {
                plugins: [new CompressionPlugin({
                    test: /\.js$|\.html$|\.css/,
                    threshold: 10240,
                    deleteOriginalAssets: false
                })]
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
                target: '192.168.0.132:8066',
                changeOrigin: true
            }
        }
    }
}
