### 项目主结构

**`.makerc`**:项目的构建配置文件，包含多架构支持的信息（如 `amd64_none` 和 `arm64_none`）

**`charts/console-backend`**:此文件夹用于存放 Helm charts，Helm 是 `Kubernetes` 的包管理工具。

**`cmd`**：程序的入口点。

**`conf`**：存放配置文件，包括数据库连接和其他环境变量设置。

​			项目下有开发环境和生产环境下的 `conf` 文件

**`migrations`**：用于存储数据库迁移文件，跟踪数据库结构的变化。

**`pkg`**：存放可供其他模块或项目重用的代码库，包括用户的身份鉴权，`kong`网关的配置。

**`scripts`**：各种自动化脚本，如部署、构建等任务的脚本。

**`server`**：后端服务代码实现，负责核心业务逻辑。

**`tests`**：测试代码，确保项目的功能正常运行。

**`vendor`**：存放项目依赖的第三方库。

**`version`**：管理版本信息，可以帮助追踪软件发行版本。

#### pkg子文件作用

该图片展示了 `pkg` 文件夹中的子目录结构。以下是每个子文件夹的详细作用说明：

1. **`auth`**

该目录通常包含与用户身份验证和授权相关的代码。可能实现了用户登录、注册、权限管理等功能。

2. **`casbinpermit`**

这个文件夹一般用于集成 Casbin，这是一个强大的访问控制库。它可以帮助项目管理用户的权限和角色，提供灵活的访问控制策略。

3. **`config`**

存放与应用程序配置相关的代码或文件，通常包括读取和解析配置文件的功能。这些配置可能包括数据库连接信息、API 密钥等。

4. **`constant`**

定义一些常量值，这些常量在项目的其他部分中会被反复使用，例如状态码、消息字符串等，方便统一管理和维护。

5. **`db`**

此文件夹通常包含与数据库交互的代码，包括模型定义、数据库连接、查询操作等。可能还包括数据库迁移逻辑。

6. **`infra`**

基础设施层，负责与外部系统或服务的集成，如第三方 API 调用、消息队列等。它通常是项目与外部环境交互的桥梁。

7. **`kong`**

如果项目涉及 API 网关，`kong` 目录可能包含与 Kong API 网关相关的代码，用于管理和路由 API 请求。

8. **`middleware`**

存放中间件的代码，中间件是在请求处理过程中执行的一段代码，常用于日志记录、请求验证、错误处理等。

9. **`secu`**

安全相关的功能模块，可能包括加密、解密、安全审计等功能，确保应用程序的数据安全性。

10. **`utils`**

工具函数库，包含一些通用的辅助函数，这些函数可以在项目的多个地方被调用，以减少代码重复。

11. **`validate`**

用于数据验证的代码，确保输入数据符合预期格式或规则，例如表单验证和 API 参数校验。



### 项目启动流程

#### 1.读取和加载配置文件

![image-20240829172943507](C:\Users\zhengjie\AppData\Roaming\Typora\typora-user-images\image-20240829172943507.png)

默认是使用生产环境的配置文件，如果在本地调试的话，我们可以在命令行后面加上 `--config`,我们的 `flag`会自动帮助我们解析命令行参数

#### 2.注册一个consoleServer服务

![image-20240829174303510](C:\Users\zhengjie\AppData\Roaming\Typora\typora-user-images\image-20240829174303510.png)

#####  2.1 初始化一个数据库引擎

![image-20240829174610541](C:\Users\zhengjie\AppData\Roaming\Typora\typora-user-images\image-20240829174610541.png)

​	从配置文件里面看数据库的配置类型（DBConfig）,如果是`"mariadb", "mysql", "tidb"`其中任意一种，我们就执行  `NewSQLDB(c.SQLPara)`这个函数，用于初始化数据库处理函数。

![image-20240829180048754](C:\Users\zhengjie\AppData\Roaming\Typora\typora-user-images\image-20240829180048754.png)

使用gorm数据库框架打开数据库连接，然后设置连接池

![image-20240829180213066](C:\Users\zhengjie\AppData\Roaming\Typora\typora-user-images\image-20240829180213066.png)



最后创建并返回一个新的 `SQLDB` 实例，其中 `db` 字段持有打开的 GORM 数据库连接

##### 2.2 初始化权限管理

![image-20240829181016682](C:\Users\zhengjie\AppData\Roaming\Typora\typora-user-images\image-20240829181016682.png)

新建一个casbinPermit实例

2![image-20240829181549436](C:\Users\zhengjie\AppData\Roaming\Typora\typora-user-images\image-20240829181549436.png)

首先先创建一个适配器adapter，会传入存储用户策略权限的数据库表名（`casbin_rules` ）

然后根据casbinConf创建casbinModel,创建模型后，我们可以使用casbin官方提供的NewEnforcer方法来执行权限检查

![](C:\Users\zhengjie\AppData\Roaming\Typora\typora-user-images\image-20240829181921206.png)

这段 `CasbinConf` 配置使用的是 **基于角色的访问控制模型**（[RBAC](https://casbin.org/docs/rbac)，Role-Based Access Control）

然后会根据casbinModel与adapter初始化casbin的Enforcer组件，使用这个方法来实现具体的访问控制逻辑

最后返回一个权限控制组件，里面包括Enforcer方法

##### 2.3加载权限策略

![image-20240829183452980](C:\Users\zhengjie\AppData\Roaming\Typora\typora-user-images\image-20240829183452980.png)

##### 2.4初始化k8s

![image-20240829184828920](C:\Users\zhengjie\AppData\Roaming\Typora\typora-user-images\image-20240829184828920.png)

![image-20240829184947799](C:\Users\zhengjie\AppData\Roaming\Typora\typora-user-images\image-20240829184947799.png)

![image-20240829185103656](C:\Users\zhengjie\AppData\Roaming\Typora\typora-user-images\image-20240829185103656.png)

代码会根据配置文件下面的 `InCluster` 文件来判断此时的运行环境是否在集群里面，代码会根据不同的情况来初始化k8s客户端

最后返回的是一个Kube实例，里面有k8s的客户端

##### 2.5初始化kong

![image-20240829185639329](C:\Users\zhengjie\AppData\Roaming\Typora\typora-user-images\image-20240829185639329.png)