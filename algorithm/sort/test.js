function heapSort(arr) {
  // 构建最大堆
  function buildMaxHeap(arr) {
    const n = arr.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      heapify(arr, n, i);
    }
  }

  // 堆调整
  function heapify(arr, n, i) {
    // console.log("输出传入的参数", arr, n, i);
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) {
      largest = left;
    }

    if (right < n && arr[right] > arr[largest]) {
      largest = right;
    }

    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      heapify(arr, n, largest);
    }
  }

  // console.log("调整前的数组", arr);
  buildMaxHeap(arr);
  // console.log("调整后的数组", arr);
  let n = arr.length;

  // 从堆顶取出元素，放到数组末尾,这句话的理解就是将堆顶的元素与堆的最后一个元素进行交换，然后
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    n--;
    heapify(arr, n, 0);
  }
}

// 示例
const arr = [12, 11, 13, 5, 6, 7];
heapSort(arr);
console.log(arr); // [5, 6, 7, 11, 12, 13]
