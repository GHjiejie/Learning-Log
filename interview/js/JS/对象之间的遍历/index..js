let obj = {
  name: "jie",
  age: 17,
  hobbies: ["basketball", "football"],
};

// 使用for in
// for (let key in obj) {
//   console.log(obj[key]);
// }

// 使用Object.entries() //同时获取对象的键和值
// for (let [key, value] of Object.entries(obj)) {
//   console.log(key, value);
// }

// 使用Object.keys()
// for (let key of Object.keys(obj)) {
//   console.log(key);
// }

Object.keys(obj).forEach((key) => {
  console.log("key:", key);
  console.log("value:", obj[key]);
});
