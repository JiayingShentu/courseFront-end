//深度克隆函数
function deepClone(origin, target) {
    var target = target || {};
    toStr = Object.prototype.toString, //对象调用toSting()
        arrStr = "[obect Array];"
    for (var prop in origin) {
        if (origin.hasOwnProperty(prop)) { //判断是否是原型上的属性还是自己的属性
            if (origin[prop] !== "null" && typeof(origin[prop]) == "object") { //判断是数组还是对象且复制者不能为空
                if (toStr.call(origin[prop]) == arrStr) {
                    target[prop] = [];
                } else {
                    target[prop] = {};
                }
                deepClone(origin[prop], target[prop]);
            } else {
                target[prop] = origin[prop]; //递归调用
            }
        }
    }
    return target;
}