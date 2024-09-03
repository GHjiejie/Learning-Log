const axios = require('axios');

// 发送请求的函数
async function fetch(url) {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(`Error fetching ${url}:`, error.message);
        return null; // 处理错误时返回null
    }
}

// 限制并发请求数量的函数
async function limitedFetch(urls, limit = 3) {
    const results = [];
    const executing = [];

    for (const url of urls) {
        const promise = fetch(url).then(result => {
            results.push(result);
            executing.splice(executing.indexOf(promise), 1); // 移除已完成的请求
        });

        executing.push(promise);

        // 如果当前正在执行的请求数达到限制，等待其中一个完成
        if (executing.length >= limit) {
            await Promise.race(executing);
        }
    }

    // 等待所有请求完成
    await Promise.all(executing);
    return results;
}

// 主程序
async function main() {
    const urls = [
        'https://jsonplaceholder.typicode.com/posts/1',
        'https://jsonplaceholder.typicode.com/posts/2',
        'https://jsonplaceholder.typicode.com/posts/3',
        'https://jsonplaceholder.typicode.com/posts/4',
        'https://jsonplaceholder.typicode.com/posts/5'
    ];

    const results = await limitedFetch(urls);
    console.log(results);
}

// 运行主程序
main().catch(console.error);
