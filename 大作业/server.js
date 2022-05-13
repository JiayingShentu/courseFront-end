/*var app = require('http').createServer()
var io = require('socket.io')(app)

app.listen(4000)
io.on('connection', function(socket) {
    console.log('connection');
    socket.emit('doSomething');
})*/
//实在是太糟心了，CORS Policy问题，搞了很久，Access-Control-Allow-Origin插件也解决不了...

var server = require('http').createServer()
const io = require('socket.io')(server, {
    cors: {
        origin: "http://127.0.0.1:5500" //不知道为啥，用localhost代替127.0.0.1就会报错
    }
});

server.listen(4000, function() {
    console.log('port is listening');
});

/*io.on('connection', function(socket) {
        console.log('connection');
        socket.emit('doSomething');
    })*/

// 玩家人数
var playerNum = 0;

// 用来存储客户端socket
var socketMap = {};

io.on('connection', function(socket) {
    playerNum++;
    socket.clientNum = playerNum;
    socketMap[playerNum] = socket;

    if (playerNum <= 1) {
        socket.emit('waiting');
    } else {
        if (socketMap[(playerNum - 1)]) {
            socket.emit('start');
            socketMap[(playerNum - 1)].emit('start');
            playerNum = playerNum - 2;
        } else {
            socket.emit('leave')
        }
    }
});