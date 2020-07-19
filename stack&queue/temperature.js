// 请根据每日 气温 列表，重新生成一个列表。对应位置的输出为：要想观测到更高的气温，至少需要等待的天数。如果气温在这之后都不会升高，请在该位置用 0 来代替。
// 例如，给定一个列表 temperatures = [73, 74, 75, 71, 69, 72, 76, 73]，你的输出应该是 [1, 1, 4, 2, 1, 1, 0, 0]。
// 提示：气温 列表长度的范围是 [1, 30000]。每个气温的值的均为华氏度，都是在 [30, 100] 范围内的整数。

/**
 * @param {number[]} T
 * @return {number[]}
 */
var dailyTemperatures = function (T) {
    // 创建返回数组，长度与传入气温列表的长度相同
    let result = new Array(T.length);
    // 初始化气温栈
    let stack = [];
    // 将天数全部初始化为0
    result.fill(0);
    // 开始遍历气温列表
    for(let i = 0; i < T.length; i++){
        // 创建一个中间对象保存当前遍历的气温和当前天数（索引）
        let temperatureObj = { tem: T[i], idx: i }
        // 如果气温栈内存在数据
        // 则使用当前气温循坏比较栈内气温
        // 如果当前气温大于栈顶的气温（前n天气温）
        // 则栈顶元素出栈，当前天数与栈顶气温天数差即为升温所需天数
        while(stack[stack.length - 1] && T[i] > stack[stack.length - 1].tem){
            let front = stack.pop()
            result[front.idx] = i - front.idx
        }
        // 比较完成后，将当前气温及天数对象入栈，作为下次遍历比较的依据
        stack.push(temperatureObj)
    }
    // 当传入气温均比较完成后，返回天数数组
    return result
};