// 获取当前时间戳
const start = performance.now();

// 标记一个时间点
performance.mark('startTask');

// 执行一些任务
for (let i = 0; i < 10000000; i++) {
  // 任务代码
}

// 标记任务结束时间点
performance.mark('endTask');

// 测量任务的执行时间
performance.measure('taskDuration', 'startTask', 'endTask');

// 获取测量结果
const measure = performance.getEntriesByName('taskDuration')[0];
console.log(`任务执行时间: ${measure.duration} 毫秒`);

// 清除标记和测量
performance.clearMarks('startTask');
performance.clearMarks('endTask');
performance.clearMeasures('taskDuration');
