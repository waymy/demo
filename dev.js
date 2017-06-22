/*var webpack = require('webpack');
var webpackConfig = require('./webpack.config.conf')
var compiler = webpack(webpackConfig)
console.log(compiler);
*/
var http = require('http');
var express = require("express");


var webpackDevMiddleware = require("webpack-dev-middleware");
var webpack = require("webpack");
var webpackConfig = require("./webpack.config.conf");

var app = express();
var httpServer = http.createServer(app);//express 自动添加到 'request' 事件。
var compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  publicPath: "/" // 大部分情况下和 `output.publicPath`相同
}));


var crypto = require('crypto'); //node 加密class
// TTP请求的升级
httpServer.on('upgrade',function(request,socket,head){
	// 固定GUID
    const GUID = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
    // 获取客户端返回的key与GUID进行sha1编码后获取base64格式摘要
    let key = request.headers['sec-websocket-key'];
    key = crypto.createHash('sha1').update(key + GUID).digest('base64');

    // 返回101协议切换响应
    const resMsg = [
        'HTTP/1.1 101 Switching Protocols',
        'Upgrade: websocket',
        'Connection: Upgrade',
        'Sec-WebSocket-Accept: ' + key,
        '\r\n'
    ].join('\r\n');

    socket.write(resMsg);

	console.log('请求成功！');
})
httpServer.on('Connection',function(socket){
    console.log('我真是太佩服自己了');
})

httpServer.listen(3000, function () {
  console.log("Listening on port 3000!");
});
