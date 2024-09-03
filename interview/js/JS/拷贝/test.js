const deepCopy = function (obj) {
  // 判断是不是基本数据类型，判断拷贝的对象是不是空
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  // 我们创建一个变量来接受copy的值
  let copyObj = Array.isArray(obj) ? [] : {};

  for (let key of obj) {
    if (typeof obj[key] !== "object") {
      copyObj[kye] = obj[key];
    } else {
      copyObj[key] = deepCopy(obj[key]);
    }
  }

  return copyObj;
};

let originObj
 