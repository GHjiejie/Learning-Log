function promiseAll(promise) {
  if (!Array.isArray(promise)) {
    return new Error("promise must be an array");
  }
  let count = 0;
  let result = [];
  return new Promise((resolve, reject) => {
    promise.forEach((item, index) => {
      Promise.resolve(item)
        .then((res) => {
          result[index] = res;
          count++;
          if (count === promise.length) {
            resolve(result);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
}

let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 1000);
});

let p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(2);
  }, 2000);
});

let p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(3);
  }, 3000);
});

promiseAll([p1, p2, p3]).then((res) => {
  console.log(res);
});
