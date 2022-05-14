/*var app = require('http').createServer()
var io = require('socket.io')(app)

app.listen(4000)
io.on('connection', function(socket) {
    console.log('connection');
    socket.emit('doSomething');
})*/
//实在是太糟心了，CORS Policy问题，搞了很久，Access-Control-Allow-Origin插件也解决不了...

const { emit } = require('process');

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
    console.log('playNum', playerNum);
    socket.clientNum = playerNum;
    socketMap[playerNum] = socket;

    if (playerNum % 2 == 1) {
        socket.emit('waiting');
    } else {
        if (socketMap[(playerNum - 1)]) {
            socket.emit('start');
            socketMap[(playerNum - 1)].emit('start');
            playerNum = playerNum - 2;
            /*//定时做分数查询、分数传输的工作
            var timer = setInterval(function() {
                socketMap[1].emit('askScore');
                socketMap[2].emit('askScore');
                socketMap[1].on('score', function(score) {
                    socketMap[2].emit('remoteScore', score);
                });
                socketMap[2].on('score', function(score) {
                    var remoteScore = score;
                    socketMap[1].emit('remoteScore', remoteScore);
                    console.log('yyyy');
                });

            }, 1000)*/
        } else {
            socket.emit('leave');
        }
    }

});

io.on('send', function() {
    console.log('yes');
})