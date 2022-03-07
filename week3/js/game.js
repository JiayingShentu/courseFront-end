const MAP_SIZE = {
    height: 10,
    length: 10
};
const BONUS_COUNT = 10;
const BONUS_SCORE = 10;
const INIT_POS = {
    row: 0,
    col: 0
}
const TIME = 20;
var score = 0;
var game_on = 0;

const initMap = (size, count, score) => { //初始化地图
    const map = [];
    const bonusRecord = initBonus(size, count);
    console.log(bonusRecord); //tip
    for (let row = 0; row < size.height; row++) {
        const rowItem = [];
        for (let col = 0; col < size.length; col++) {
            if (!isInRecord([row, col], bonusRecord)) {
                rowItem.push(null);
                console.log('2');
                continue;
            }
            rowItem.push({
                bonus: score
            })
        }
        map.push(rowItem)
    }
    return map;
}

const initBonus = (size, count) => {
    const record = [];
    while (record.length < count) {
        const row = Math.floor(Math.random() * size.height);
        const col = Math.floor(Math.random() * size.length);
        if ((row == 0 && col == 0) || isInRecord([row, col], record)) {
            continue;
        }
        record.push([row, col]);
    }
    return record;
}

const isInRecord = (position, record) => {
    for (let i = 0; i < record.length; i++) {
        if ((position[0] == record[i][0]) && (position[1] == record[i][1])) {
            return true;
        }
    }
    return false;
}

const drawMap = (map) => { //绘制地图
    const mapContainer = document.getElementsByClassName('map')[0];
    mapContainer.innerHTML = '';
    for (let i = 0; i < map.length; i++) {
        const oRow = document.createElement('div');
        oRow.className = 'row';
        for (let j = 0; j < map[0].length; j++) {
            const oCell = document.createElement('div');
            oCell.className = 'cell';
            //这里需要对是否有图片做一个判断if…插入图片
            if (map[i][j] != null) {
                const oImage = document.createElement('img');
                oImage.class = 'soy';
                oImage.src = 'prize.svg';
                oCell.appendChild(oImage);
            }
            oRow.appendChild(oCell);
        }
        mapContainer.appendChild(oRow);
    }
    console.log('行数' + map.length)
    console.log('列数' + map[0].length)
}

const initPerson = () => {
    addPerson([INIT_POS.row, INIT_POS.col]);
}

const deleteImg = ([i, j]) => {
    const oRowBefore = document.getElementsByClassName('row')[i];
    const oPersonBefore = oRowBefore.children[j];
    if (oPersonBefore.lastElementChild) {
        oPersonBefore.removeChild(oPersonBefore.lastElementChild);
    }
}

const addPerson = ([i, j]) => {
    const oRowAfter = document.getElementsByClassName('row')[i];
    const oPersonAfter = oRowAfter.children[j];
    const oImagePerson = document.createElement('img');
    oImagePerson.class = 'person';
    oImagePerson.src = 'robot.svg';
    oPersonAfter.appendChild(oImagePerson);
}
const movePerson = (map, i, j) => {
    window.addEventListener("keydown", function(e) {
        deleteImg([i, j]);
        keyResult = e.keyCode;
        if (score == 100) { keyResult = 0; }
        switch (keyResult) {
            case (38 || 87): //上
                if (i > 0) {
                    i--;
                }
                break;
            case (39 || 68): //右
                if (j < MAP_SIZE.length - 1) {
                    j++;
                }
                break;
            case (40 || 83): //下
                if (i < MAP_SIZE.height - 1) {
                    i++;
                }
                break;
            case (37 || 65): //左
                if (j > 0) {
                    j--;
                }
                break;
        }
        if (map[i][j] != null) {
            score += map[i][j].bonus;
            console.log(score);
            const oScore = document.getElementsByClassName('score')[0];
            oScore.innerHTML = score;
            deleteImg([i, j]);
            map[i][j] = null;
        }
        addPerson([i, j]);
        if (score == 100) {
            popup(true);
        }
    }, false)
}

const map = initMap(MAP_SIZE, BONUS_COUNT, BONUS_SCORE);
const main = async() => { //这是什么？？？
    console.log(map);
    //await loadImages()
    drawMap(map);
    initPerson();
}

const popup = (win) => {
    message = win ? "恭喜你，通关啦！" : "很遗憾，时间到了…"
    const oResult = document.getElementsByClassName('result')[0];
    const oPopup = document.createElement('div');
    const otext = document.createTextNode(message);
    oPopup.appendChild(otext);
    oResult.appendChild(oPopup);
}


main();

var oStartGame = document.getElementById('btn');
oStartGame.addEventListener("click", function() {
    var time = TIME;
    const oTime = document.getElementsByClassName('time')[0];
    timer = setInterval(function() {
        oTime.innerHTML = time + ' s';
        if (time > 0) {
            time--;
        } else if (time = 0) {
            /*popup(false);*/
        }
    }, 1000);
}, false);

oStartGame.addEventListener("click", function() {
    movePerson(map, INIT_POS.row, INIT_POS.col);
})