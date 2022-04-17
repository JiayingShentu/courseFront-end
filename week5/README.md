:white_check_mark: 自定义协议的规范    
&ensp; &ensp; 1. 封包后，发送的报文以'#'作为开头，以'$'作为结尾     
&ensp; &ensp; 2. 若data中出现'#','$',则用转义符'/#','/$'表示    
&ensp; &ensp; 3. server接收到client的消息后回复，并关闭服务器      
&ensp; &ensp; 举例：输入'$/Hello world#/'，则封包后变为'#/$//Hello world/#//$'
</br>
</br>
:white_check_mark: 实现协议的解析器  
&ensp; &ensp; 1. 解析器为parse类中的process过程，将报文复原为原来的消息    
&ensp; &ensp; 举例：'#/$//Hello world/#//$'解析为'$/Hello world#/'
</br>
</br>
:white_check_mark: 使用net模块实现两个进程基于该协议进行通信 
&ensp; &ensp; 1. client向server发送一条信息    
&ensp; &ensp; 2. server接收信息，并向client回复一条信息，server关闭socket进程     
&ensp; &ensp; 3. client接收信息     
</br>
</br>
