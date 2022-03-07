const initMap = (size, count, score) => {
    const map = [];
    const bonusRecord = initBonus(size, count);
    for (let row = 0; row < size.height; row++) {
        const rowItem = [];
        for (let col = 0; col < size.length; col++) {
            if (!isInRecord([row, col], bonusRecord)) {
                rowItem.push(null);
                continue;
            }
            rowItem.push({ bonus: score })
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
    if (record.indexOf(position) == -1) {
        return false;
    } else {
        return true;
    }
}

const drawMap = (map) => {

}

const main = async() => { //这是什么？？？
    map = initMap(MAP_SIZE, BONUS_COUNT, BONUS_SCORE);
    console.log(map)
    await loadImages()
    drawMap(map)
}

main();