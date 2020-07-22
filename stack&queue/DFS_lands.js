// 岛屿数量问题
// 给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。
// 岛屿总是被水包围，并且每座岛屿只能由水平方向或竖直方向上相邻的陆地连接形成。
// 此外，你可以假设该网格的四条边均被水包围。
const _test_ = [
    // ["1", "1", "1", "1", "0"],
    // ["1", "1", "0", "1", "0"],
    // ["1", "1", "0", "0", "0"],
    // ["0", "0", "0", "0", "0"]
    ['1', '1', '0', '0', '0'],
    ['1', '1', '0', '0', '0'],
    ['0', '0', '1', '0', '0'],
    ['0', '0', '0', '1', '1']
];

/**
 * 深度优先遍历
 * @param {character[][]} grid
 * @param {number} rows
 * @param {number} cols
 * @param {number} r
 * @param {number} c
 * @returns {void}
 */
var dfs = function (grid, rows, cols, r, c) {
    // 判断当前行、列是否越界
    // 如果越界或已访问过，直接退出
    if (r < 0 || c < 0 || r >= rows || c >= cols ||  (grid[r][c] === '0')) {
        return
    }
    // 否则将当前元素标记为已访问
    grid[r][c] = '0'
    // 递归遍历相邻元素是否符合要求
    dfs(grid, rows, cols, r + 1, c) // 上
    dfs(grid, rows, cols, r - 1, c) // 下
    dfs(grid, rows, cols, r, c + 1) // 右
    dfs(grid, rows, cols, r, c - 1) // 左
}
/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
    let number = 0; // 初始化岛屿数量
    let rows = grid.length // 缓存矩阵行数
    if(rows === 0) return 0
    let cols = grid[0].length // 缓存矩阵列数

    for (let r = 0; r < rows; r++) { // 遍历行
        for (let c = 0; c < cols; c++) { // 遍历列
            if (grid[r][c] === '1') { // 如果当前元素为陆地
                ++number // 岛屿数量+1
                // 将当前元素作为根节点，开始执行深度优先遍历
                dfs(grid, rows, cols, r, c)
            }
        }
    }
    // 遍历完成后 返回岛屿数量
    return number
};

console.log(numIslands([]))
