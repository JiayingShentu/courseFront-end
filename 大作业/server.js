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

// 玩家人数
var playerNum = 0;

// 用来存储客户端socket
var socketMap = {};

io.on('connection', function(socket) {
    playerNum++;
    console.log('playNum', playerNum);
    socket.clientNum = playerNum;
    socketMap[playerNum] = socket;
    var player1 = true,
        player2 = true;
    if (playerNum % 2 == 1) {
        socket.emit('waiting');
    } else {
        if (socketMap[(playerNum - 1)]) {
            socket.emit('start');
            socketMap[(playerNum - 1)].emit('start');
            playerNum = playerNum - 2;
            //定时做分数传输的工作
            socketMap[1].on('score', function(score) {
                socketMap[2].emit('remoteScore', score);
            });
            socketMap[2].on('score', function(score) {
                socketMap[1].emit('remoteScore', score);
            });
            //判断输赢
            socketMap[1].on('gameOver', function() {
                player1 = false;
                if (player2 == true) {
                    socketMap[2].emit('result', 'WIN');
                    socketMap[1].emit('result', 'LOSE');
                }
            });
            socketMap[2].on('gameOver', function() {
                player2 = false;
                if (player1 == true) {
                    socketMap[1].emit('result', 'WIN');
                    socketMap[2].emit('result', 'LOSE');
                }
            })
        } else {
            socket.emit('leave');
        }
    }
});