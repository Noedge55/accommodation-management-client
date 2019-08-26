module.exports = {
    devServer: {
        proxy: {
            '/am': {
                target: 'http://192.168.50.153:8070/am/',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/am': '/'
                }
            }
        }
    }
}
