function deepClone(obj, hash = new WeakMap()) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (hash.has(obj)) {
    return hash.get(obj);
  }

  let result;

  if (obj instanceof Date) {
    result = new Date(obj);
  } else if (Array.isArray(obj)) {
    result = [];
    obj.forEach((item, index) => {
      result[index] = deepClone(item, hash);
    });
  } else if (obj instanceof Object) {
    result = {};
    hash.set(obj, result);
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        result[key] = deepClone(obj[key], hash);
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

const copy = deepClone(original);
console.log(copy);

// 确认是深拷贝
copy.address.city = "Neverland";
console.log(original.address.city); // 输出: "Wonderland"
console.log(copy.address.city); // 输出: "Neverland"
console.log(copy.circular === copy); // 输出: true
console.log(copy.circular === original); // 输出: false
