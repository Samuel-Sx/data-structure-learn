/** 你有一个带有四个圆形拨轮的转盘锁。
 * 每个拨轮都有10个数字： '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' 。每个拨轮可以自由旋转
 * 例如把 '9' 变为  '0'，'0' 变为 '9' 。每次旋转都只能旋转一个拨轮的一位数字。
 * 锁的初始数字为 '0000' ，一个代表四个拨轮的数字的字符串。
 * 列表 deadends 包含了一组死亡数字，一旦拨轮的数字和列表里的任何一个元素相同，这个锁将会被永久锁定，无法再被旋转。
 * 字符串 target 代表可以解锁的数字，你需要给出最小的旋转次数，如果无论如何不能解锁，返回 -1。
 */

/**
 * @param {string[]} deadends
 * @param {string} target
 * @return {number}
 */
var openLock = function (deadends, target) {
    const lock = [
        ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
        ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
        ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
        ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    ]
    const rows = lock.length
    const cols = lock[0].length
    let arrow = 1;
    let step = 0;
    let result = '';
    for(let r = 0; r < rows; r++){
        for (let c = 0;  c < cols; c++) { // 遍历第一列
            let queue = [];
            queue.push(lock[r][c]);
            while(queue.length >= 0){
                let current = queue.shift();
                if(current && current !== target[r]){
                    lock[r][c] = false
                }
            }
        }
    }
    console.log(step)
};


openLock(["0201", "0101", "0102", "1212", "2002"], "0202")