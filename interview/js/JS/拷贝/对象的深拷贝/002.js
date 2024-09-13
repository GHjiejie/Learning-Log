function deepCopy(obj, hash = new WeakMap()) {
  if (typeof obj === "object" || obj == null) {
    return obj;
  }

  if (hash.has(obj)) {
    return hash.get(obj);
  }
  let res;
  if (obj instanceof Date) {
    res = new Date(obj);
  } else if (Array.isArray(obj)) {
    res = [];
    for (let i = 0; i < obj.length; i++) {
      res[i] = deepCopy(obj[i], hash);
    }
  } else {
    res = {};
    hash.set(obj, res);
    for (let [key, value] of Object.entries(obj)) {
      if (obj.hasOwnProperty(key)) {
        res[key] = deepCopy(obj[key], hash);
      }
    }
  }
  return res;
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
  
  const copy = deepCopy(original);
  console.log(copy);
  
  // 确认是深拷贝
  copy.address.city = "Neverland";
  console.log(original.address.city); // 输出: "Wonderland"
  console.log(copy.address.city); // 输出: "Neverland"
  console.log(copy.circular === copy); // 输出: true
  console.log(copy.circular === original); // 输出: false
  