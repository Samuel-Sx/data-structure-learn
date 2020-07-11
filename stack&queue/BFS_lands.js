// 岛屿数量问题
// 给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。
// 岛屿总是被水包围，并且每座岛屿只能由水平方向或竖直方向上相邻的陆地连接形成。
// 此外，你可以假设该网格的四条边均被水包围。
const _test_ = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]];

var numIslands = function(grid) {
    // 源数据检测，如果不是数组类型 或者数组为空状态下，直接返回0个不进行后续操作
    if(!Array.isArray(grid) || grid.length <=0) return 0;
    const nr = grid.length; // 缓存行总数
    const nc = grid[0].length // 缓存列总数
    let lands = 0; // 初始化岛屿数量

    /** 通过坐标遍历，寻找陆地（值为1的格子） */
    for(let r = 0; r < nr; r++){ // 遍历行
        for(let c = 0; c < nc; c++){ // 遍历列
            if(grid[r][c] === '1'){ // 如果当前元素为陆地
                ++lands; // 岛屿数量+1
                grid[r][c] = '0' // 将当前元素修改为0 表示已访问  不一定设置为0，任何非1的值均可

                // 开启广度优先遍历
                let nabers = [] // 创建队列保存相邻节点坐标
                nabers.push([r, c]) //首先将当前元素坐标加入至队列
                /** 同级节点比较
                 *  当节点符合条件时，修改节点状态为已执行
                 *  同时将同级节点加入队列准备后续比较
                 */
                while(nabers.length > 0){ // 队列中存在数据时执行广度优先遍历
                    let front = nabers.shift() // 弹出当前队列首位
                    let [r, c] = front // 获取行列坐标
                    if(grid[r-1] && grid[r-1][c] === '1'){ // 上节点
                        nabers.push([r-1, c])
                        grid[r-1][c] = '0';
                    }
                    if(grid[r+1] && grid[r+1][c] === '1'){ // 下节点
                        nabers.push([r+1, c])
                        grid[r+1][c] = '0';
                    }
                    if(grid[r][c-1] && grid[r][c-1] === '1'){ // 左节点
                        nabers.push([r, c-1])
                        grid[r][c-1] = '0';
                    }
                    if(grid[r][c+1] && grid[r][c+1] === '1'){ // 右节点
                        nabers.push([r, c+1])
                        grid[r][c+1] = '0';
                    }
                }
            }
        }
    }
    return lands
};


console.log(numIslands(_test_))