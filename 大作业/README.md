# 俄罗斯方块    

## 游戏基础功能，完全实现
:white_check_mark: 方块模型随机出现/模型移动和旋转       
:white_check_mark: 满行后删除整行，上层方块下移一层，并计分      
:white_check_mark: 判断游戏结束     

## 附加功能：用socket.io实现通信
:white_check_mark: 服务器自动分配对手，实现双人对决    
:white_check_mark: 实时显示对方的分数，并及时判断输赢（此功能于5.14-24：00前实现，下午课堂展示时未完成）       

注：   
`npm install`     `node server.js`   
## 通信功能演示     
<b>1 开局时双人匹配</b>: &nbsp; &nbsp;单人不开启游戏，双人自动开启游戏    
👇        
<img src="https://github.com/JiayingShentu/courseFront-end/blob/main/ignore/%E5%8F%8C%E4%BA%BA%E5%8C%B9%E9%85%8D.gif" width="50%">

<b>2 游戏中双人得分实时显示</b>: &nbsp; &nbsp; local score表示自己的分数，remote score表示对方的分数     
👇      
<img src="https://github.com/JiayingShentu/courseFront-end/blob/main/ignore/%E5%8F%8C%E4%BA%BA%E5%88%86%E6%95%B0%E5%AE%9E%E6%97%B6%E6%98%BE%E7%A4%BA.gif" width="50%">

<b>3 双人游戏结果弹窗</b>: &nbsp; &nbsp; 一方游戏结束后，双方均弹出弹窗告知游戏结果     
👇      
<img src="https://github.com/JiayingShentu/courseFront-end/blob/main/ignore/%E5%8F%8C%E4%BA%BA%E6%88%90%E8%B4%A5%E6%98%BE%E7%A4%BA.gif" width="50%">

