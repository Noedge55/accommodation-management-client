module.exports = {
    devServer: {
        proxy: {
            '/am': {
                target: 'http://localhost:8070/am/',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/am': '/'
                }
            }
        }
    },
    configureWebpack: {
        resolve: {
            alias: {
                'assets': '@/assets',
                'styles': '@/assets/styles'
            }
        }
    },
}
