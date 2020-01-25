const proxy = require('http-proxy-middleware');

module.exports = function(app){
    app.use(
        '/api',
        proxy({
            target: "http://liwuhou.cn:8080",
            changeOrigin: true,
        })
    )
}