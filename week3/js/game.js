const MAP_SIZE = {
    height: 10,
    length: 10
};
const BONUS_COUNT = 21;
const BONUS_SCORE = 10;
const INIT_POS = {
    row: 0,
    col: 0
}
const TIME = 15;
var score = 0;
var game_on = 0;
var timer = null;
var time = TIME;
var bomb = false;
const pos = {
    row: INIT_POS.row,
    col: INIT_POS.col
}

const initMap = (size, count, score) => { //初始化地图
    const map = [];
    const bonusRecord = initBonus(size, count);
    for (let row = 0; row < size.height; row++) {
        const rowItem = [];
        for (let col = 0; col < size.length; col++) {
            const bonusNum = isBonusRecord([row, col], bonusRecord);
            if (bonusNum == 0) {
                rowItem.push(null);
                continue;
            }
            rowItem.push({
                bonus: bonusNum
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
        const tmp = Math.floor(Math.random() * 3);
        if ((row == 0 && col == 0) || (isBonusRecord([row, col], record) != 0)) {
            continue;
        }
        if (record.length > 12 && record.length <= 17) { //5个幽灵
            record.push([row, col, -5]);
            continue;
        }
        if (record.length > 17 && record.length <= 19) { //2个炸弹
            record.push([row, col, -100]);
            continue;
        }
        if (record.length > 19) { //1个增加时间的道具
            record.push([row, col, 'time']);
            continue;
        }
        bonus = tmp + 8; //12个豆子，分数8，9，10随机
        record.push([row, col, bonus]);
    }

    return record;
}

const isBonusRecord = (position, record) => {
    for (let i = 0; i < record.length; i++) {
        if ((position[0] == record[i][0]) && (position[1] == record[i][1])) {
            return record[i][2];
        }
    }
    return 0;
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
            if (map[i][j] != null) {
                const oImage = document.createElement('img');
                oImage.class = 'soy';
                const bonus = map[i][j].bonus;
                if (bonus == -5) {
                    oImage.src = 'image/ghost.svg'
                } else if (bonus == -100) {
                    oImage.src = 'image/bomb.svg'
                } else if (bonus == 'time') {
                    oImage.src = 'image/heart.svg';
                } else {
                    oImage.src = 'image/dot.svg';
                }
                oCell.appendChild(oImage);
            }
            oRow.appendChild(oCell);
        }
        mapContainer.appendChild(oRow);
    }
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

const addPerson = ([i, j], direction) => {
    const oRowAfter = document.getElementsByClassName('row')[i];
    const oPersonAfter = oRowAfter.children[j];
    const oImagePerson = document.createElement('img');
    oImagePerson.class = 'person';
    oImagePerson.src = 'image/pacman.svg';
    const rotation = ['rotate(-90deg)', 'rotate(0deg)', 'rotate(90deg)', 'rotate(180deg)']
    oImagePerson.style.transform = rotation[direction];
    oPersonAfter.appendChild(oImagePerson);
}
const movePerson = () => {
    window.addEventListener("keydown", function(e) {
        deleteImg([pos.row, pos.col]);
        let keyResult = e.keyCode;
        let direction;
        if (!game_on) { keyResult = 0; }
        switch (keyResult) {
            case (38 || 87): //上
                if (pos.row > 0) {
                    pos.row--;
                    direction = 0;
                }
                break;
            case (39 || 68): //右
                if (pos.col < MAP_SIZE.length - 1) {
                    pos.col++;
                    direction = 1;
                }
                break;
            case (40 || 83): //下
                if (pos.row < MAP_SIZE.height - 1) {
                    pos.row++;
                    direction = 2;
                }
                break;
            case (37 || 65): //左
                if (pos.col > 0) {
                    pos.col--;
                    direction = 3;
                }
                break;
        }
        var i = pos.row,
            j = pos.col;
        if (map[i][j] != null) {
            bonus = map[i][j].bonus;
            if (bonus != 'time') {
                score += map[i][j].bonus;
            }
            if (map[i][j].bonus == -100) bomb = true;
            if (map[i][j].bonus == 'time') time += 5;
            check();
            const oScore = document.getElementsByClassName('score')[0];
            oScore.innerHTML = score;
            deleteImg([pos.row, pos.col]);
            map[i][j] = null;
        }
        addPerson([i, j], direction);
        console.log(pos.row, pos.col);
    }, false)
}

var map = initMap(MAP_SIZE, BONUS_COUNT, BONUS_SCORE);
const main = async() => { //异步加载，？？？
    console.log(map);
    //await loadImages()
    drawMap(map);
    initPerson();
}

const popup = (result) => { //result=0通关；result=1失败；result=2踩到炸弹
    message = ["恭喜你，通关啦！", "很遗憾，时间到了…", "BOMB！你被炸飞了！"]
    const oResult = document.getElementsByClassName('result')[0];
    const oPopup = document.createElement('div');
    oPopup.id = 'popup';
    const otext = document.createTextNode(message[result]);
    const oRestart = document.createElement('input');
    oRestart.type = 'button';
    oRestart.value = 'Restart';
    oRestart.id = 'btnRestart';
    oPopup.appendChild(otext);
    oPopup.appendChild(oRestart);
    oResult.appendChild(oPopup);

    oRestart.addEventListener("click", restart, false);
}




const start = () => {
    game_on = 1;
    score = 0;
    time = TIME;
    const oTime = document.getElementsByClassName('time')[0];

    timer = setInterval(function() {
        if (time > 0) {
            time--;
            check();
        }
        oTime.innerHTML = time + ' s';
    }, 1000);
}


const restart = () => {
    console.log('restart')
    time = TIME;
    score = 0;
    bomb = false;
    pos.row = INIT_POS.row;
    pos.col = INIT_POS.col;
    const oResult = document.getElementsByClassName('result')[0];
    oResult.removeChild(oResult.lastElementChild);

    const oTime = document.getElementsByClassName('time')[0];
    oTime.innerHTML = '15 s';
    const oScore = document.getElementsByClassName('score')[0];
    oScore.innerHTML = '0';

    var oStartGame = document.getElementById('btnStart');
    oStartGame.removeEventListener("click", movePerson)

    map = initMap(MAP_SIZE, BONUS_COUNT, BONUS_SCORE);
    main();
}

const check = () => {
    if (time == 0 || score >= 100 || bomb == true) {
        if (timer != null) {
            clearInterval(timer);
            timer = null;
        }
        game_on = 0;
        if (score >= 100) popup(0);
        if (time == 0) popup(1);
        if (bomb == true) popup(2);
    }
}

main();

var oStartGame = document.getElementById('btnStart');
oStartGame.addEventListener("click", start);
oStartGame.addEventListener("click", movePerson);