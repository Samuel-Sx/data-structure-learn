/** 你有一个带有四个圆形拨轮的转盘锁。
 * 每个拨轮都有10个数字： '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' 。每个拨轮可以自由旋转
 * 例如把 '9' 变为  '0'，'0' 变为 '9' 。每次旋转都只能旋转一个拨轮的一位数字。
 * 锁的初始数字为 '0000' ，一个代表四个拨轮的数字的字符串。
 * 列表 deadends 包含了一组死亡数字，一旦拨轮的数字和列表里的任何一个元素相同，这个锁将会被永久锁定，无法再被旋转。
 * 字符串 target 代表可以解锁的数字，你需要给出最小的旋转次数，如果无论如何不能解锁，返回 -1。
 */



/**
 * 我们可以将 0000 到 9999 这 10000 状态看成图上的 10000 个节点，两个节点之间存在一条边，
 * 当且仅当这两个节点对应的状态只有 1 位不同，且不同的那位相差 1（包括 0 和 9 也相差 1 的情况），
 * 并且这两个节点均不在数组 deadends 中。那么最终的答案即为 0000 到 target 的最短路径。
 * 我们用广度优先搜索来找到最短路径，从 0000 开始搜索。对于每一个状态，它可以扩展到最多 8 个状态，
 * 即将它的第 i = 0, 1, 2, 3 位增加 1 或减少 1，将这些状态中没有搜索过并且不在 deadends 中的状态全部加入到队列中，
 * 并继续进行搜索。注意 0000 本身有可能也在 deadends 中。
*/


/**
 * @param {string[]} deadends
 * @param {string} target
 * @return {number}
 */
var openLock = function (deadends, target) {
    let queue = [];
    let deads = new Set(deadends);
    let limit = target.length;
    let step = 0;
    // 先判断死亡节点中是否存在初始值
    // 如果存在，直接返回-1
    if (deads.has('0000')) { 
        return -1
    }

    queue.push('0000');

    // 广度优先遍历
    while (queue.length > 0) { 
        // 获取上次遍历后，加入队列中不是解锁值的节点数量
        let prevAddNodeNums = queue.length; 
        // 如果上次加入队列中的节点未完全比较完成
        // 不能进入新添加节点遍历
        while (prevAddNodeNums > 0) {
            prevAddNodeNums--
            // 获取队首节点
            let front = queue.shift();
            // 比较当前节点是否为解锁值
            // 如果是，直接返回步数
            if (front === target) {  
                return step;
            }
            // 获取密码锁位数
            let index = limit;
            // 对每个位数的转盘进行正反转动（+1  -1）
            while (index > 0) {
                index--;
                let next = modifyNum(front, index, true); // 获取正传转盘的值
                let prev = modifyNum(front, index, false);// 获取反转转盘的值
                // 如果正传值不存在于死亡节点中
                if (!deads.has(next)) {
                    deads.add(next); // 将衍生值加入死亡节点（标记为已比较）
                    queue.push(next); // 将衍生值加入队列，作为下次遍历的根节点
                }
                // 如果反转值不存在于死亡节点中
                if (!deads.has(prev)) {
                    deads.add(prev); // 将衍生值加入死亡节点（标记为已比较）
                    queue.push(prev); // 将衍生值加入队列，作为下次遍历的根节点
                }
            }
        }
        // 当上一轮衍生的节点完全遍历比较完成后
        // 步骤数+1
        step += 1
    }
    // 如果所有节点均遍历完成且没有目标值，则认为没有能够解锁的值，返回 -1
    return -1
};

var modifyNum = function (str, idx, isAdd) {
    let strs = str.split('');
    let num = Number(strs[idx]);

    num = isAdd ? num + 1 : num - 1;
    num = num < 0 ?
        9 :
        num > 9 ?
            0 :
            num
    strs[idx] = String(num)
    return strs.join('');
}


let s = openLock(["0201", "0101", "0102", "1212", "2002"], "0202")
console.log(s)