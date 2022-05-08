//常量
//每次移动的距离
var STEP = 40;
//行和列
var ROW_MAX = 18;
var COL_MAX = 10;
var current_x = 0;
var current_y = 0;
//创建每个模型的数据源
const MODELS = [
    //第一个模型数据源（L）
    {
        0: {
            row: 2,
            col: 0
        },
        1: {
            row: 2,
            col: 1
        },
        2: {
            row: 2,
            col: 2
        },
        3: {
            row: 1,
            col: 2
        }
    }
];

//变量
//当前使用的模型
var currentModel = {};
//main入口
function init() {
    createModel();
    onKeyDown();
}
init();

//根据模型的数据源来创建对应的块元素
function createModel() {
    //模块归位
    current_x = 0;
    current_y = 0;
    //确定使用的模型
    currentModel = MODELS[0];
    console.log('bian', currentModel[0].row);
    console.log('bubian', currentModel[0].row)
        //生成对应数量的块元素
    for (var key in currentModel) {
        var divEle = document.createElement('div');
        divEle.className = 'livingSquare';
        document.getElementsByClassName('background')[0].appendChild(divEle);
    }
    //定位块元素位置
    locationBlocks();
}

//根据数据源定位块元素的位置
function locationBlocks() {
    //1.拿到所有块元素
    var livingSquares = document.getElementsByClassName('livingSquare');
    for (var i = 0; i < livingSquares.length; i++) {
        //单个块元素
        var livingSquare = livingSquares[i];
        //2.找到每个块元素对应的数据
        var blockModel = currentModel[i];
        //3.根据每个块元素对应的数据来指定块元素的位置
        livingSquare.style.top = (current_y + blockModel.row) * STEP + 'px';
        livingSquare.style.left = (current_x + blockModel.col) * STEP + 'px';
    }


}
//监听键盘事件
function onKeyDown() {
    document.onkeydown = function(event) {
        //console.log(event.key, typeof(event.key))
        switch (event.key) {
            case 'ArrowUp':
                rotate();
                console.log('up');
                break;
            case 'ArrowDown':
                move(0, 1)
                console.log('down');
                break;
            case 'ArrowLeft':
                move(-1, 0);
                console.log('left');
                break;
            case 'ArrowRight':
                move(1, 0)
                console.log('right');
                break;
        }
        isFixed();
    }
}

function move(x, y) {
    //控制模块进行移动
    current_x = current_x + x;
    current_y = current_y + y;
    //判断是否越界可以移动，越界则取消模块移动
    if (!checkBorder()) {
        current_x = current_x - x;
        current_y = current_y - y;
    }
    locationBlocks();

}

function rotate() {
    for (var key in currentModel) {
        var blockModel = currentModel[key];
        var tmp = blockModel.row;
        blockModel.row = blockModel.col;
        blockModel.col = 3 - tmp;
    }
    locationBlocks();
}

function checkBorder() {
    var topBorder = 0,
        leftBorder = 0,
        bottomBorder = ROW_MAX,
        rightBorder = COL_MAX;
    for (var key in currentModel) {
        var blockModel = currentModel[key];
        var row = blockModel.row + current_y;
        var col = blockModel.col + current_x;
        if (row < topBorder || row > bottomBorder - 1) return false;
        if (col < leftBorder || col > rightBorder - 1) return false;
    }
    return true;
}

function isFixed() {
    var livingSquares = document.getElementsByClassName('livingSquare');
    if (atBottom()) {
        for (var i = livingSquares.length - 1; i >= 0; i--) {
            var livingSquare = livingSquares[i];
            livingSquare.className = 'deadSquare';
        }
        createModel();
    }
}

function atBottom() {
    for (var key in currentModel) {
        var blockModel = currentModel[key];
        var row = blockModel.row + current_y;
        if (row == ROW_MAX - 1) return true;
    }
    return false;
}