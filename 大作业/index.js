//常量
//每次移动的距离
var STEP = 40;
//行和列
var ROW_MAX = 18;
var COL_MAX = 10;
var current_x = 0;
var current_y = -3;
var timer = null;
//创建每个模型的数据源
const MODELS = [
    //模型L
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
    },
    //模型田
    {
        0: {
            row: 1,
            col: 1
        },
        1: {
            row: 2,
            col: 1
        },
        2: {
            row: 1,
            col: 2
        },
        3: {
            row: 2,
            col: 2
        }

    },
    //模型1
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
            row: 2,
            col: 3
        }
    },
    //模型凸
    {
        0: {
            row: 2,
            col: 0
        },
        1: {
            row: 1,
            col: 1
        },
        2: {
            row: 2,
            col: 1
        },
        3: {
            row: 2,
            col: 2
        }
    },
    //模型Z
    {
        0: {
            row: 2,
            col: 0
        },
        1: {
            row: 1,
            col: 1
        },
        2: {
            row: 2,
            col: 1
        },
        3: {
            row: 1,
            col: 2
        }
    }
];
//固定不动的方块的集合
var deadModel = {};
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
    current_y = -3;
    //随机确定使用的模型
    var modelNum = Math.floor(Math.random() * 5);
    currentModel = deepClone(MODELS[modelNum]);
    //生成对应数量的块元素
    for (var key in currentModel) {
        var divEle = document.createElement('div');
        divEle.className = 'livingSquare';
        document.getElementsByClassName('background')[0].appendChild(divEle);
    }
    //定位块元素位置
    locationBlocks();
    //自动下落
    fallDown();
}


//根据数据源定位块元素的位置
function locationBlocks() {
    //1.拿到所有块元素
    var livingSquares = document.getElementsByClassName('livingSquare');
    for (var i = 0; i < livingSquares.length; i++) {
        //单个块元素
        var livingSquare = livingSquares[i];
        //找到每个块元素对应的数据
        var blockModel = currentModel[i];
        //根据每个块元素对应的数据来指定块元素的位置
        if (current_y + blockModel.row < 0) {
            livingSquare.style.display = 'none';
        } else {
            livingSquare.style.display = 'block';
        }
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

    }
}

function move(x, y) {
    //控制模块进行移动
    current_x = current_x + x;
    current_y = current_y + y;
    //如果移动会导致越界或碰撞，则取消模块移动
    if (!checkBorder() || !checkCollision()) {
        current_x = current_x - x;
        current_y = current_y - y;
    }

    locationBlocks();
    if (y == 1) {
        isFixed(); //如果有触底，则将模块固定
    }

}

function rotate() {
    for (var key in currentModel) {
        var blockModel = currentModel[key];
        var tmp = blockModel.row;
        blockModel.row = blockModel.col;
        blockModel.col = 3 - tmp;
    }
    //如果旋转会导致越界或碰撞，则不旋转
    if (!checkBorder() || !checkCollision()) {
        for (var key in currentModel) {
            var blockModel = currentModel[key];
            var tmp = blockModel.col;
            blockModel.col = blockModel.row;
            blockModel.row = 3 - tmp;
        }
    }
    locationBlocks();
}

function checkBorder() {
    var leftBorder = 0,
        bottomBorder = ROW_MAX,
        rightBorder = COL_MAX;
    for (var key in currentModel) {
        var blockModel = currentModel[key];
        var row = blockModel.row + current_y;
        var col = blockModel.col + current_x;
        if (row > bottomBorder - 1) return false;
        if (col < leftBorder || col > rightBorder - 1) return false;
    }
    return true;
}

function isFixed() {
    var livingSquares = document.getElementsByClassName('livingSquare');
    if (atBottom() || downCollide()) {
        for (var i = livingSquares.length - 1; i >= 0; i--) {
            var livingSquare = livingSquares[i];
            livingSquare.className = 'deadSquare';
            var blockModel = currentModel[i];
            deadModel[(current_y + blockModel.row) + '_' + (current_x + blockModel.col)] = livingSquare;
        }
        var fullRow = checkRowFull();
        if (fullRow != -1) {
            deleteRow(fullRow);
            deadModelFall(fullRow);
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

function downCollide() {
    for (var key in currentModel) {
        var blockModel = currentModel[key];
        var row = blockModel.row + current_y;
        var col = blockModel.col + current_x;
        if (deadModel[(row + 1) + '_' + col] != null) return true;
    }
    return false;
}

function checkCollision() {
    for (var key in currentModel) {
        var blockModel = currentModel[key];
        var row = blockModel.row + current_y;
        var col = blockModel.col + current_x;
        if (deadModel[row + '_' + col] != null) return false;
    }
    return true;
}

function checkRowFull() {
    for (var i = ROW_MAX - 1; i >= 0; i--) {
        var num = 0; //计算一行Square的个数
        for (var j = COL_MAX - 1; j >= 0; j--) {
            if (deadModel[i + '_' + j] != null) num++;
        }
        if (num == COL_MAX) return i;
    }
    return -1;
}

function checkEnd() {
    for (var col = 0; col < COL_MAX; col++) {
        if (deadModel[0 + '_' + col] != null) return true;
    }
    return false;
}

function deleteRow(row) {
    for (var col = COL_MAX - 1; col >= 0; col--) {
        document.getElementsByClassName('background')[0].removeChild(deadModel[row + '_' + col]);
        deadModel[row + '_' + col] = null;
    }
}

function deadModelFall(row) {
    for (var i = row - 1; i >= 0; i--) {
        for (var j = COL_MAX - 1; j >= 0; j--) {
            if (deadModel[i + '_' + j] != null) {
                deadModel[(i + 1) + '_' + j] = deadModel[i + '_' + j];
                console.log(deadModel[(i + 1) + '_' + j].style.top);
                deadModel[(i + 1) + '_' + j].style.top = (i + 1) * STEP + 'px';
                deadModel[i + '_' + j] = null;
            }
        }
    }
}

function fallDown() {
    if (timer != null) {
        clearInterval(timer);
    }
    timer = setInterval(function() {
        if (checkEnd()) {
            gameOver();
        }
        move(0, 1);
    }, 1000)
}

function gameOver() {
    if (timer != null) {
        clearInterval(timer);
    }
    alert('游戏结束');
}