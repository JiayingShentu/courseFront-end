const net = require('net');
const { Parser, packet } = require('./protocol');

const server = net.createServer((socket) => {
    const parser = new Parser();
    socket.on('data', (data) => {
        parser.append(data)
        if (parser.check()) {
            console.log('[server receive]:', parser.process())
            console.log('[server]: i should give client a feedback')
                //强制输出并关闭socket
            socket.end(packet('$/##-Hello, i have received your message, im server!#/$'))
        } else {
            console.log('waiting...')
        }
    });

    socket.on('close', function() {
        console.log('server close')
    })
    socket.on('error', function() {
        console.log('error')
    });
});
//启动服务器
server.listen(9000);