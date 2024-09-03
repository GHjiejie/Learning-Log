// 升序
function heapSort(arr) {
  //构建大顶堆
  function bulidMaxHeap(arr, n, i) {
    let largest = i;
    let left = i * 2 + 1;
    let right = i * 2 + 2;

    if (left < n && arr[left] > arr[largest]) {
      largest = left;
    }
    if (right < n && arr[right] > arr[largest]) {
      largest = right;
    }
    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      bulidMaxHeap(arr, n, largest);
    }
  }
  // 构建小顶堆
  function buildMinHeap(arr, n, i) {
    let min = i;
    let left = i * 2 + 1;
    let right = i * 2 + 2;
    if (left < n && arr[left] < arr[min]) {
      min = left;
    }
    if (right < n && arr[right] < arr[min]) {
      min = right;
    }
    if (i !== min) {
      [arr[min], arr[i]] = [arr[i], arr[min]];
      buildMinHeap(arr, n, min);
    }
  }
  let n = arr.length;
  // 首先获取大顶堆
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    // 如果是构建大顶堆
    // bulidMaxHeap(arr, n, i);
    buildMinHeap(arr, n, i);
  }
  // console.log("输出得到的大顶堆", arr);
  console.log("输出得到的小顶堆", arr);

  // 升序输出
  for (let i = n - 1; i > 0; i--) {
    // 把堆顶的元素与堆尾的元素交换，然后堆的逻辑长度减一
    [arr[0], arr[n - 1]] = [arr[n - 1], arr[0]];
    n--;
    buildMinHeap(arr, n, 0);
  }
  return arr;
}

// 示例
const arr = [12, 11, 13, 5, 56, 6, 7];
heapSort(arr);
console.log(arr); // [5, 6, 7, 11, 12, 13]
