// 设计你的循环队列实现。 循环队列是一种线性数据结构，其操作表现基于 FIFO（先进先出）原则并且队尾被连接在队首之后以形成一个循环。它也被称为“环形缓冲器”。

// 循环队列的一个好处是我们可以利用这个队列之前用过的空间。在一个普通队列里，一旦一个队列满了，我们就不能插入下一个元素，即使在队列前面仍有空间。但是使用循环队列，我们能使用这些空间去存储新的值。

// 你的实现应该支持如下操作：

// MyCircularQueue(k): 构造器，设置队列长度为 k 。
// Front: 从队首获取元素。如果队列为空，返回 -1 。
// Rear: 获取队尾元素。如果队列为空，返回 -1 。
// enQueue(value): 向循环队列插入一个元素。如果成功插入则返回真。
// deQueue(): 从循环队列中删除一个元素。如果成功删除则返回真。
// isEmpty(): 检查循环队列是否为空。
// isFull(): 检查循环队列是否已满。




/**
 * Initialize your data structure here. Set the size of the queue to be k.
 * @param {number} k
 */
var MyCircularQueue = function(k) {
    this.queue = []; // 初始化队列容器数组
    this.head = -1; // 初始化头指针
    this.fail = -1; // 初始化尾指针
    this.len = k - 1; // 初始化队列长度
};

/**
 * Insert an element into the circular queue. Return true if the operation is successful.
 * @param {number} value
 * @return {boolean}
 */
MyCircularQueue.prototype.enQueue = function(value) {
    // 判断队列当前是否已满
    // 如果队列已满，直接返回false
    if(this.isFull()){
        return false
    }
    // 如果当前队列为空，先将头指针移至第一个元素索引
    this.isEmpty() && (this.head = 0);
    // 尾部指针自增
    // 如果自增后越界，则从新回到队首
    ++this.fail > this.len && (this.fail = 0)
    // 将数据填入队尾
    this.queue[this.fail] = value;
    // 返回入队成功
    return true;
};

/**
 * Delete an element from the circular queue. Return true if the operation is successful.
 * @return {boolean}
 */
MyCircularQueue.prototype.deQueue = function() {
    // 判断队列是否为空
    // 如果队列为空，直接返回false
    if(this.isEmpty()){
        return false
    }
    // 先从队首移除当前元素
    this.queue[this.head] = null;
    // 如果头指针和尾指针同时指向一个元素
    // 移除元素后需要将头尾指针初始化为-1状态
    if(this.head === this.fail){
        this.head = -1;
        this.fail = -1;
    }else{
    // 否则自增头指针至下一个元素
    // 如果自增后越界，则重新回到队首
        ++this.head > this.len && (this.head = 0)
    }
    return true;

};

/**
 * Get the front item from the queue.
 * @return {number}
 */
MyCircularQueue.prototype.Front = function() {
    // 判断队列是否为空
    // 如果为空直接返回-1
    if(this.isEmpty()){
        return -1
    }
    // 否则返回队首元素
    return this.queue[this.head]
};

/**
 * Get the last item from the queue.
 * @return {number}
 */
MyCircularQueue.prototype.Rear = function() {
    // 判断当前队列是否为空
    // 为空直接返回-1
    if(this.isEmpty()){
        return -1
    }
    // 否则返回队尾元素
    return this.queue[this.fail]
};

/**
 * Checks whether the circular queue is empty or not.
 * @return {boolean}
 */
MyCircularQueue.prototype.isEmpty = function() {
    // 如果头尾指针都为初始值，则认为当前队列为空
    return (this.head === -1 && this.fail === -1)
};

/**
 * Checks whether the circular queue is full or not.
 * @return {boolean}
 */
MyCircularQueue.prototype.isFull = function() {
    // 缓存尾指针+1位置索引
    let end = this.fail + 1
    // 处理索引越界
    end > this.len && (end = 0)
    // 如果尾指针+1索引等于头部指针索引
    // 可以认为当前队列已满
    return end === this.head
};
