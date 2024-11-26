## 1.你如何在自己的项目里面使用grpc?

### 1.首先就是安装必要的环境

```go
go get google.golang.org/grpc
go get google.golang.org/protobuf/cmd/protoc-gen-go
go get google.golang.org/grpc/cmd/protoc-gen-go-grpc
```

我们可以参考官方文档 [quick start](https://grpc.io/docs/languages/go/quickstart/)

首先是安装protoc buffer 编译器

```go
 go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
 go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest
```

这两个命令是用于安装 Go 语言中的 Protocol Buffers 和 gRPC 的插件，它们的作用如下：

1. **`protoc-gen-go`**:
   
   - **作用**: 这是一个 Protocol Buffers 的 Go 语言插件。它允许开发者将 `.proto` 文件（Protocol Buffers 的定义文件）编译成 Go 语言代码。通过这个插件，可以生成与定义的消息类型和服务相对应的 Go 结构体和方法，方便在 Go 中使用 Protocol Buffers 进行数据序列化和反序列化。
   - **用法**: 一旦安装，可以使用 `protoc` 命令结合此插件来生成 Go 代码，例如：
     
     ```bash
    protoc --go_out=. your_file.proto
     ```

#### `user.pb.go`文件的生成

1. **`protoc-gen-go-grpc`**:

   - **作用**: 这是一个 gRPC 的 Go 语言插件。它在 Protocol Buffers 的基础上进一步扩展，允许将 `.proto` 文件中的 gRPC 服务定义编译成 Go 语言代码。通过这个插件，可以生成 gRPC 服务器和客户端的相关代码，简化了 gRPC 服务的实现过程。
   - **用法**: 安装后，可以使用 `protoc` 命令结合此插件来生成 gRPC 相关代码，例如：
     ```bash
     protoc --go-grpc_out=. your_service.proto
     ```

#### `user_grpc.pb.go`文件的生成

**总结**

- `protoc-gen-go`: 用于生成 Protocol Buffers 的 Go 语言代码。
- `protoc-gen-go-grpc`: 用于生成 gRPC 服务的 Go 语言代码。

这两个插件常常一起使用，以便于在 Go 项目中使用 Protocol Buffers 和 gRPC 来进行高效的网络通信。

### 2.编写 `.proto` 文件

以下面这个文件为例子

```protobuf
syntax = "proto3";

// Define the user package
package user;

import "google/api/annotations.proto";

option go_package = "repository/userpb";

// Define the User service
service UserService {
    // 用户注册
    rpc RegisterUser(RegisterUserRequest) returns (RegisterUserResponse) {
        option (google.api.http) = {
            post: "/v1/user/register"
            body: "*"
        };
    }
    // 用户登录
    rpc LoginUser(LoginUserRequest) returns (LoginUserResponse) {
        option (google.api.http) = {
            post: "/v1/user/login"
            body: "*"
        };
    }
}

// Define the request message
message RegisterUserRequest {
    string username = 1;
    string password = 2;
}

// Define the response message

message RegisterUserResponse {
    string id = 1;
    string username = 2;
}

// Define the request message
message LoginUserRequest {
    string username = 1;
    string password = 2;
}

// Define the response message
message LoginUserResponse {
    string id = 1;
    string username = 2;
}
```

如果我们需要将gRPC 服务方法与 RESTful HTTP 请求和响应进行映射，我们需要在这个文件里面导入一个包

```go
import "google/api/annotations.proto";
```

这个包的作用非常大，如果我们不导入这个包的话，就会导致protocol Buffers编译的时候报错，因为我们的代码里面是依赖于这个包里面的方法的 `google.api.http`

```protobuf
option (google.api.http) = {
            post: "/v1/user/register"
            body: "*"
        };
```

注意，此时我们还不可以通过网络请求去进行接口的调用？**因为此时gRPC 接口映射到 HTTP/JSON 接口**

### 3.使用`grpc-gateway` 将 gRPC 服务自动转换为 RESTful API 

需要注意，这个库是我们 `google/api/annotations.proto`里面依赖的库（实际上就是`google/api/http.proto`），所以我们需要将其下载到本地，

然后执行下面这段代码（执行完后项目 /repository/userpb）下面会有 `user.pb.gw.go`这个文件的生成

#### `user.pb.gw.go`文件的生成

```go
protoc --grpc-gateway_out=. user.proto
```

如果执行过程中发生错误，我们需要检查一下有没有安装这个插件

```go
protoc-gen-grpc-gateway -version  //查看当前系统是否安装了这个插件

go install github.com/grpc-ecosystem/grpc-gateway/v2/protoc-gen-grpc-gateway@latest
```



`grpc-gateway` 是一个将 gRPC 服务自动转换为 RESTful API 的库，它的主要作用和必要性如下：

**主要作用**

1. **RESTful API 转换**:
   - `grpc-gateway` 可以在不修改原有 gRPC 服务的情况下，将 gRPC 接口映射到 HTTP/JSON 接口。这使得 gRPC 服务能够通过标准的 RESTful API 被访问。

2. **JSON 支持**:
   - 它允许客户端使用 JSON 进行数据交换，而不是 gRPC 使用的 Protocol Buffers 格式。这对于需要与不同语言或平台交互的前端应用程序尤其重要，因为许多前端框架更容易处理 JSON。

3. **简化客户端访问**:
   - 对于不支持 gRPC 的客户端，`grpc-gateway` 提供了一个简单的方法来通过 HTTP 调用 gRPC 服务。这样，开发者可以在没有 gRPC 客户端库的环境中仍然能够访问服务。

4. **自定义路由**:
   - 开发者可以通过注解在 `.proto` 文件中指定 HTTP 路由，从而创建灵活的 API，并对请求进行自定义处理。

**必要性**

1. **兼容性**:
   - 在微服务架构中，不同的服务可能需要使用不同的协议。通过提供 RESTful API，`grpc-gateway` 增强了 gRPC 服务的兼容性，使其能够与广泛的现有系统和工具集成。

2. **易用性**:
   - 对于前端开发人员而言，使用 RESTful API 通常比直接使用 gRPC 更直观。`grpc-gateway` 使得后端服务能同时提供 gRPC 和 HTTP 接口，降低了学习曲线，提高了开发效率。

3. **生态系统的整合**:
   - 大多数 Web 应用程序和工具（如浏览器、调试工具等）都以 REST 和 JSON 为基础。`grpc-gateway` 使得 gRPC 服务可以轻松地融入这些现有生态系统中。

4. **无缝迁移**:
   - 如果团队之前使用 RESTful API，但希望迁移到 gRPC，`grpc-gateway` 提供了一种平滑的过渡方式，允许他们逐步采用 gRPC，同时保持对旧 API 的支持。

**总结**

`grpc-gateway` 在现代服务架构中发挥着重要的作用，它使得 gRPC 服务可以通过 RESTful API 进行访问，增加了服务的灵活性和可用性，是实现微服务和多样化客户端支持的一种有效工具。	

### 4.[生成OpenAPI 文件（Swagger 文件）](https://go-kratos.dev/docs/guide/openapi/)

1. **安装 `protoc-gen-openapi` 插件：**
   - 首先，你需要安装 `protoc-gen-openapi` 插件。如果你使用的是 gRPC Gateway v2，插件现在称为 `protoc-gen-openapiv2`。
- 你可以通过 Go 语言的包管理工具安装：
  
   ```bash
   go install github.com/grpc-ecosystem/grpc-gateway/v2/protoc-gen-openapiv2@latest
   go install github.com/grpc-ecosystem/grpc-gateway/protoc-gen-swagger@latest
   ```
```
   
2. **确保插件在系统路径中：**
   - 安装后，确保 `GOPATH/bin` 目录已经加入到系统的环境变量 `PATH` 中，这样系统才能识别到 `protoc-gen-openapiv2` 命令。

   在 Windows 系统中，你可以运行以下命令将 Go 的 `bin` 目录添加到 `PATH`：

   ```bash
   set PATH=%PATH%;%GOPATH%\bin
```

3. **调整 `protoc` 命令：**
   如果你使用的是新版插件，命令需要更新为：

   ```bash
   protoc -I=. --openapiv2_out=logtostderr=true:. user.proto
   ```

4. **验证安装是否成功：**
   运行以下命令验证插件是否安装成功：

   ```bash
   protoc-gen-openapiv2 --version
   ```

如果上述步骤完成后依然出现错误，请确保 `.proto` 文件内容正确配置，并检查 `protoc` 是否能找到相关的依赖文件。

执行一下命令生成swagger文件

`protoc -I. --swagger_out=logtostderr=true:. pb/user.proto`

当然，如果我们要指定生成的swagger文件的位置，比如下面这段代码的作用

`protoc -I. --swagger_out=logtostderr=true:pb/swagger pb/user.proto`



**命令说明**

- `-I.`: 指定导入路径为当前目录。

- ```
  --swagger_out=logtostderr=true:.
  ```

  - `logtostderr=true` 表示将日志输出到标准错误。
  - `.` 表示将生成的 Swagger 文件放在当前目录。

- `pb/user.proto`: 是你的 Protobuf 文件的路径。

### 5.查看openAPI文件

生成成功后，你可以通过几种方式查看 OpenAPI 文档（Swagger 文件）：

1. **查看 JSON 文件**

生成的 OpenAPI 文档通常是一个 JSON 文件，文件名通常以 `.swagger.json` 或类似格式命名。找到这个文件后，你可以使用文本编辑器（如 Notepad++、VS Code、Sublime Text 等）打开它，查看其内容。

2. **使用 Swagger UI**

为了更直观地查看和测试 API 接口，可以使用 Swagger UI 来展示 OpenAPI 文档。以下是如何配置和使用 Swagger UI 的步骤：

**步骤一：下载 Swagger UI**

1. 从 [Swagger UI GitHub 仓库](https://github.com/swagger-api/swagger-ui) 下载最新版本的 Swagger UI。
2. 解压缩下载的文件并将其放置在你的项目目录中。

**步骤二：修改 `index.html`**

在 Swagger UI 的解压目录中，找到 `index.html` 文件，将以下代码添加到适当的位置，以便指向你的 OpenAPI 文档（假设文档名为 `user.swagger.json`）：

```html
const ui = SwaggerUIBundle({
  url: "http://localhost:8080/user.swagger.json", // 替换为你的 swagger.json 文件的 URL
  dom_id: '#swagger-ui',
  presets: [
    SwaggerUIStandalonePreset
  ],
  layout: "StandaloneLayout"
});
```

确保你的 JSON 文件可通过 HTTP 访问，如果你是在本地开发，最好启动一个简单的静态文件服务器。

**步骤三：启动静态文件服务器（可选）**

如果你希望在本地运行 Swagger UI，您可以使用 Python 启动一个简单的 HTTP 服务器（假设你的 Swagger UI 和 `user.swagger.json` 在同一个目录下）：

```bash
# Python 3.x
python -m http.server 8080
```

然后，通过浏览器访问 `http://localhost:8080`，你应该能看到 Swagger UI 界面。

**3. 在线 Swagger 编辑器**

你也可以将生成的 OpenAPI 文档上传到 [Swagger Editor](https://editor.swagger.io/) 网站，直接在线查看和编辑。

1. 打开 [Swagger Editor](https://editor.swagger.io/)。
2. 点击左侧的 "File" 菜单，然后选择 "Import File" 上传你的 JSON 文件。
3. 你将在右侧看到文档的可视化界面。

**4. 使用 Postman 导入**

Postman 也支持导入 OpenAPI 文件：

1. 打开 Postman。
2. 点击左侧的 "APIs" 选项卡。
3. 点击 "Import API"，然后选择 "OpenAPI" 作为导入格式。
4. 上传或粘贴 JSON 文档的内容。

这样你就可以在 Postman 中查看和测试所有的 API 接口。

**总结**

无论是查看 JSON 文件内容，使用 Swagger UI 进行可视化，还是利用 Postman 进行 API 测试，都可以帮助你更好地理解和使用生成的 OpenAPI 文档。

### 6.补充：

- [google/api/annotations.proto文件路径](https://github.com/googleapis/googleapis/blob/master/google/api/annotations.proto)

- [google/api/http.proto文件路径](google/api/annotations.proto)

- [demo地址](https://github.com/GHjiejie/grpc-test)，需要注意文件的结构，尤其是在使用protoc编译器的时候，文件路径不要搞错

  比如说

  ```protobuf
  protoc -I=. --go_out=. user.proto
  ```

  此时这里的 `-I`你需要知道是什么意思，他是根据你 `proto`文件的导入的依赖包的路径来的，

  `import "google/api/annotations.proto";`就表明这个 `protoc`文件在编译的时候会依赖到你项目根目录下的 `google/api`里面的 `annotations.proto`文件

### 7.后续完善

你的内容已经相当全面，以下是一些可能的补充和细节，可以帮助你更深入地理解 gRPC 和相关工具的使用：

1. gRPC 的基本概念

- **Protocol Buffers**: gRPC 使用 Protocol Buffers 作为其接口定义语言。了解 Protocol Buffers 语法和特性（如消息类型、枚举、嵌套消息等）对于设计高效的 API 是很重要的。

- **服务定义**: gRPC 服务可以有多个方法，每个方法都有独立的请求和响应消息。这种服务定义方式支持多种调用模式，包括：
  - **Unary RPC**: 客户端发送单个请求并接收单个响应。
  - **Server Streaming RPC**: 客户端发送请求并获得服务器的流式响应。
  - **Client Streaming RPC**: 客户端流式发送请求并获得单个响应。
  - **Bidirectional Streaming RPC**: 双向流式通信，客户端和服务器都可以同时发送和接收消息。

2. 错误处理

- gRPC 提供了一套标准的错误处理机制，通过 `status` 包来表示错误状态。了解如何使用这些状态码将帮助你更好地处理服务中的异常情况。

3. 中间件与拦截器

- gRPC 支持中间件和拦截器，可以用来实现日志记录、认证、统计等功能。了解如何编写和使用这些中间件可以增强你的服务。

4. 性能优化

- gRPC 默认使用 HTTP/2 协议，这比传统的 HTTP/1.x 有更好的性能和多路复用能力。了解如何配置 gRPC，以最大化利用 HTTP/2 的优势，例如调整流量控制和连接管理。

5. 安全性

- gRPC 支持 TLS 加密，可以确保客户端和服务器之间的通信安全。了解如何为 gRPC 服务配置 SSL/TLS 是非常重要的。

6. 版本管理

- 在 API 演进过程中，保持版本兼容性是很重要的做法。可以通过在 `.proto` 文件中使用不同的包名或服务名来实现版本管理。

7. 文档生成

- 除了 OpenAPI 文档外，还有其他工具和库可以自动生成 API 文档，如 `protoc-gen-doc`。了解这些工具可以使文档化工作更加高效。

8. 客户端示例

- 添加客户端代码示例，展示如何使用生成的代码调用 gRPC 服务，以及如何处理返回结果。例如，你可以提供一个简单的 Go 客户端示例，演示如何调用 `RegisterUser` 和 `LoginUser` 方法。

9. gRPC 与 REST 的选择

- 讨论选择 gRPC 还是 REST 的情况，何时适合用 gRPC，何时适合用 REST。gRPC 更适合微服务架构和高性能应用，而 REST 则在广泛的浏览器和开发者工具中更具兼容性。

以上补充内容提供了更全面的视角，能帮助你更深入地理解 gRPC 及其生态系统。如果需要进一步探讨某个主题或具体实现，请告诉我！



## 2.如何参加一个http到grpc的多路复用器？

以下是一个具体实例，解释如何使用 `runtime.NewServeMux` 来创建一个 gRPC 多路复用器，并结合 HTTP 请求和 gRPC 服务的处理。

### 背景

假设我们正在构建一个简单的在线图书管理系统，其中有一个 gRPC 服务提供图书信息的 CRUD（创建、读取、更新、删除）操作。我们希望通过 RESTful API（HTTP 接口）来访问这些 gRPC 功能，以便让不支持 gRPC 的客户端（如网页前端或移动应用）也能够访问这些服务。

### 1. 定义 Protobuf 消息和服务

首先，我们定义一个简单的 Protobuf 文件 `book.proto`：

```protobuf
syntax = "proto3";

package book;

// 图书消息
message Book {
  string id = 1; // 图书ID
  string title = 2; // 图书标题
  string author = 3; // 作者
}

// 定义图书服务
service BookService {
  rpc GetBook(Book) returns (Book); // 获取图书信息
  rpc CreateBook(Book) returns (Book); // 创建新图书
}
```

### 2. 实现 gRPC 服务

接下来，我们实现这个 gRPC 服务：

```go
package main

import (
	"context"
	"log"
	"net"

	pb "path/to/your/proto/package" // 导入生成的 protobuf 包

	"google.golang.org/grpc"
)

// Server 实现了 BookService
type server struct {
	pb.UnimplementedBookServiceServer // 避免未实现方法的错误
	books map[string]*pb.Book // 存储图书信息
}

func (s *server) GetBook(ctx context.Context, book *pb.Book) (*pb.Book, error) {
	return s.books[book.Id], nil // 根据 ID 返回图书信息
}

func (s *server) CreateBook(ctx context.Context, book *pb.Book) (*pb.Book, error) {
	s.books[book.Id] = book
	return book, nil // 返回新创建的图书
}

func main() {
	lis, err := net.Listen("tcp", ":50051")
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	s := grpc.NewServer()
	pb.RegisterBookServiceServer(s, &server{books: make(map[string]*pb.Book)})

	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
```

### 3. 创建 HTTP 到 gRPC 的多路复用器

现在，我们要使用 `runtime.NewServeMux` 将 HTTP 请求转发到 gRPC 服务。

```go
package main

import (
	"context"
	"log"
	"net/http"

	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	"google.golang.org/grpc"
	pb "path/to/your/proto/package"
)

func main() {
	// 启动 gRPC 服务器
	go startGRPCServer()

	// 创建 gRPC 多路复用器
	ctx := context.Background()
	rmux := runtime.NewServeMux(
		runtime.WithMarshalerOption(
			runtime.MIMEWildcard,
			&runtime.JSONPb{
				MarshalOptions: protojson.MarshalOptions{
					EmitDefaultValues: true,
					UseProtoNames:     true,
				},
				UnmarshalOptions: protojson.UnmarshalOptions{
					DiscardUnknown: true,
				},
			},
		),
	)

	// 注册 gRPC 服务到多路复用器
	err := pb.RegisterBookServiceHandlerFromEndpoint(ctx, rmux, "localhost:50051", []grpc.DialOption{grpc.WithInsecure()})
	if err != nil {
		log.Fatalf("Failed to register service handler: %v", err)
	}

	// 启动 HTTP 服务器
	http.Handle("/", rmux)
	log.Println("Starting HTTP server on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func startGRPCServer() {
	// 在这里启动 gRPC 服务器代码
}
```

### 4. 客户端请求示例

在这个示例中，客户端可以使用 HTTP 请求调用图书服务。例如，创建一本新书的请求可以使用以下 CURL 命令：

```bash
curl -X POST \
  http://localhost:8080/v1/book \
  -H 'Content-Type: application/json' \
  -d '{
        "id": "1",
        "title": "The Go Programming Language",
        "author": "Alan A. A. Donovan"
      }'
```

### 5. 工作流程

1. **HTTP 请求**: 客户端发送 HTTP 请求到 `/v1/book` 路径。
2. **多路复用器处理**: `rmux` 接收到请求并识别出该请求需要转发给 gRPC 服务。
3. **请求转换**: `rmux` 将 HTTP 请求转换为相应的 gRPC 请求，执行 `CreateBook` 方法。
4. **响应返回**: gRPC 服务处理请求后返回响应，`rmux` 将响应转换为 JSON 格式并返回给 HTTP 客户端。

### 总结

通过使用 `runtime.NewServeMux` 和配置序列化选项，我们能够灵活地将 HTTP 请求与 gRPC 服务连接起来，使得不支持 gRPC 的客户端也能方便地访问 gRPC 服务。这种设计模式使得服务更加友好，促进了不同协议之间的互操作性。



## 后续补充

- 在执行代码的生成的时候需要提前安装好依赖

-  对于脚本代码的理解

  `protoc --go_out=. .user.proto`  这段代码需要你结合user.proto文件的位置与里面的option一起去看

  如果你的项目结构和我的示例代码的项目结构是一样的，就是说那个user.proto文件在项目的根目录下，那么就可以执行这个命令

  但是实际情况大多数不是这样子的，比如你的user.proto文件在proto文件夹下面，那么你就需要指定这个文件的位置，我们需要将上面的代码修改为一下

  `protoc --go_out=. ./proto/user.proto`

  

