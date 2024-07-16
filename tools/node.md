#### multer.js(处理文件上传)与sharp.js(处理文件压缩)

以用户上传的图片我文件为例子，[旅游陪玩](https://github.com/GHjiejie/my_travel)这个项目就处理的不好，我是将原来的文件与压缩后的文件都存储在服务器里面，这样就会导致服务器的内存很快就会溢出，那么有没有解决方案呢？当然有：

- 在使用multer对源图片文件进行处理时，使用临时内存,这种方法可以对于自己的个人项目来说

  ，使用起来是绰绰有余的了，但是还是有缺点的，内存还是会溢出

  ```javascript
  const storage=multer.memoryStorage();
  const upload=multer({storage});
  ```

- 使用第三方的云存储服务

  将文件上传到第三方云存储服务提供商，比如Amazon S3、Google Cloud Storage、阿里云OSS等，服务器本身只需要存储文件的访问链接，而不是文件本身吗，这样就最大程度避免了内存容易溢出的问题

- 使用分布式文件系统（未接触过）

