const path = require('path');
function resolve (dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    lintOnSave: true,
    chainWebpack: (config)=>{
        config.resolve.alias
            .set('@$', resolve('src'))
            .set('assets',resolve('src/assets'))
            .set('styles',resolve('src/assets/styles'))
    },
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
    },configureWebpack: {
        devtool: 'source-map'
    }
}
