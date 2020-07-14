// 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。

// 有效字符串需满足：

// 左括号必须用相同类型的右括号闭合。
// 左括号必须以正确的顺序闭合。
// 注意空字符串可被认为是有效字符串。


var isValid = function (s) {
    /** 设置枚举值，方便比较 */
    let emun = {
        '(': 1,
        '{': 2,
        '[': 3,
        ')': 4,
        '}': 5,
        ']': 6
    }
    /** 将字符串拆分为数组 */
    let quetos = s.split('')
    // 初始化储存栈
    let stack = [];

    // 遍历字符串数组
    for (let q in quetos) {
        // 如果枚举出的值为反括号区域
        if (emun[quetos[q]] >= 4) {
            // 判断储存栈长度为空，证明再此之前没有正括号入栈，直接返回false
            if (stack.length === 0) {
                return false;
            } else {
            // 否则获取栈顶元素枚举与当前遍历元素枚举值
                if (emun[stack[stack.length - 1]] !== emun[quetos[q]] - 3) {
                    // 如果不符合要求，直接返回false
                    return false
                } else {
                    // 如果两个括号成功配对，则当前栈顶元素出栈
                    stack.pop()
                }
            }
        // 如果为正括号
        } else {
            // 直接执行入栈操作
            stack.push(quetos[q])
        }
    }
    // 循环结束后，如果栈内还存在元素，则至少有一个括号未闭合，返回false
    if (stack.length > 0) {
        return false
    }
    // 否则所有括号均匹配成功
    return true
};

console.log(isValid("([)"))