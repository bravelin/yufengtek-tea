module.exports = {
    publicPath: './',
    assetsDir: '',
    productionSourceMap: false,
    devServer: {
        port: 8099,
        https: false,
        hotOnly: false,
        disableHostCheck: true,
        proxy: {
            '/bigdata': {
                // target: 'http://192.168.2.117:10013/bigdata/',
                target: 'http://tea.yufengtek.com/tea-Web-Bigdata/bigdata/',
                // target: 'http://192.168.2.124/tea-Web-Bigdata/bigdata/',
                changeOrigin: true,
                pathRewrite: {
                    '^/bigdata': ''
                }
            },
            '/data': {
                // target: 'http://192.168.2.117:10013/data/',
                target: 'http://tea.yufengtek.com/tea-Web-Bigdata/data/',
                // target: 'http://192.168.2.124/tea-Web-Bigdata/data/',
                changeOrigin: true,
                pathRewrite: {
                    '^/data': ''
                }
            }
        }
    }
}
