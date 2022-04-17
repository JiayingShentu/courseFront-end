//自定义协议
//发送的报文以#作为开头，以$作为结尾
//若data中出现#,$,则用转义符/#,/$表示
//server接收到client的消息后回复并关闭服务器

//封包
function packet(data) {
    //转成buffer
    const bufferData = Buffer.from(data, 'utf-8');

    //计算封包后的buffer长度,当遇到#,$,/时buffer长度++
    var bufferLength = 2;
    for (let i = 0; i < bufferData.length; i++) {
        bufferLength++;
        if (bufferData[i] == '0x23' || bufferData[i] == '0x24' || bufferData[i] == '0x2F') {
            bufferLength++;
        }
    }

    //分配一个buffer存储数据
    let buffer = Buffer.allocUnsafe(bufferLength);

    //设计开始标记'#'
    buffer[0] = '0x23';

    //检查data中是否有#,$,/,若有，则插入转义符/
    var num = 0; //num表示#,$,/的个数
    for (let i = 0; i < bufferData.length; i++) {
        if (bufferData[i] == '0x23' || bufferData[i] == '0x24' || bufferData[i] == '0x2F') {
            buffer[i + 1 + num] = '0x2F';
            num++;
        }
        buffer[i + 1 + num] = bufferData[i];
    }

    //设计结束标记'$'
    buffer[bufferLength - 1] = '0x24';
    return buffer;
}

//解包
class Parser {
    constructor(message) {
        this.message = message;
        this.buffer = null; //初始的字节流
    }

    //判断数据是否传输完整
    check() {
        if (this.buffer != null && this.buffer.length >= 2 &&
            this.buffer[0] == '0x23' && this.buffer[this.buffer.length - 1] == '0x24') { //判断是否以#开头，以$结尾
            if (this.buffer.length == 2) {
                return true;
            }
            if (this.buffer[this.buffer.length - 2] != '0x2F') {
                return true;
            }

            for (i = 0; i < this.buffer.length; i++) {
                if (buffer[i] == '0x2F') {
                    i++;
                    if (i == this.buffer.length - 1) {
                        return false;
                    }
                }
            }
            return true;
        }
        return false;
    };

    //拼接传过来的数据
    append(data) {
        //保存待解析的数据
        if (this.buffer == null) {
            this.buffer = data;
        } else {
            this.buffer = Buffer.concat([this.buffer, data])
        }
        //console.log('append now:', this.buffer);//测试
    }

    //解析数据
    process() {
        let buffer = this.buffer;
        let resultLength = buffer.length - 2;
        for (let i = 0; i < buffer.length; i++) {
            if (buffer[i] == '0x2F') {
                i++;
                resultLength--;
            }
        }
        let result = Buffer.allocUnsafe(resultLength);
        if (buffer[0] == '0x23' && buffer[buffer.length - 1] == '0x24') {
            for (let i = 1, j = 0; i < buffer.length - 1; i++, j++) {
                if (buffer[i] == '0x2F') {
                    i++;
                }
                result[j] = buffer[i];
            }
            return (result.toString('utf-8'))
        }
    }
}

module.exports = {
    packet,
    Parser,
};