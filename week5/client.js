const net = require('net');
const { Parser, packet } = require('./protocol');

const socket = net.connect({ port: 9000 });
socket.on('connect', function() {
    console.log('[client]: connect')
})
socket.on('error', function() {
    console.log('client error');
});

const parser = new Parser();
// 客户端写数据（缓冲）
console.log('[client]: i want to send server a secret message');
socket.write(packet('$/##-Hello, im client!#/$'));
// 收到数据 
socket.on('data', (data) => {
    parser.append(data)
    if (parser.check()) {
        console.log('[client receive]:', parser.process())
    } else {
        console.log('waiting...')
    }
});