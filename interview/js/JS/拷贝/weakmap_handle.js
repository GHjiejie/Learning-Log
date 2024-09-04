function deepcopy(obj, hash = new WeakMap()) {
  // 首先判断obj是否是null或者不是对象，如果是直接返回obj
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  // 如果hash中已经存在obj，直接返回hash中的obj
  if (hash.has(obj)) {
    return hash.get(obj);
  }
  let result;
  // 判断是不是Date类型
  if (obj instanceof Date) {
    result = new Date(obj);
  } else if (Array.isArray(obj)) {
    result = [];
    // 循环遍历数组，递归调用deepcopy
    obj.forEach((item, index) => {
      result[index] = deepcopy(item, hash);
    });
  } else {
    result = {};
// 使用hash.set(obj, result)将obj和result存入hash中，防止循环引用  
    hash.set(obj, result);
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        result[key] = deepcopy(obj[key], hash);
      }
    }
  }
  return result;
}

// 示例
const original = {
  name: "Alice",
  age: 25,
  hobbies: ["reading", "gaming"],
  address: {
    city: "Wonderland",
    zip: "12345",
  },
  dateOfBirth: new Date("1998-01-01"),
  circular: null,
};

original.circular = original; // 添加循环引用

const copy = deepcopy(original);
console.log(copy);
