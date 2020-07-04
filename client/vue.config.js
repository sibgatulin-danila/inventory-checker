const path = require('path');
// const { config } = require('process');
module.exports = {
    outputDir: path.resolve(__dirname, '../server/public'),
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000'
            }
        }
    },
    chainWebpack: config => {
        config.resolve
            .alias
                .set('ui', '@/ui')
                .set('util', '@/util')
    }
}