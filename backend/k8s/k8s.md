## 如何理解k8s里面的ingress

在 Kubernetes 中，**Ingress** 是一种 API 对象，用于管理外部用户如何访问集群中的服务。它提供了一种 HTTP 和 HTTPS 路由机制，可以将外部请求转发到集群内部的服务。

### Ingress 的主要功能

1. **路由**：
   - Ingress 使得可以基于请求的主机名和路径来路由流量。例如，可以将 `example.com` 的流量路由到一个服务，而将 `example.com/api` 的流量路由到另一个服务。

2. **负载均衡**：
   - 它可以将流量分配到多个后端服务上，从而实现负载均衡。

3. **SSL/TLS 终止**：
   - Ingress 可以配置 SSL/TLS，以便在前端处理加密流量，从而减轻后端服务的负担。

4. **身份验证**：
   - 可以通过 Ingress 实现基本的身份验证或其他访问控制策略。

### Ingress 控制器

Ingress 本身并不是一个完整的解决方案，它需要与 **Ingress 控制器** 配合使用。Ingress 控制器是负责处理 Ingress 资源的实际实现，常见的 Ingress 控制器有：

- NGINX Ingress Controller
- Traefik
- HAProxy Ingress
- AWS ALB Ingress Controller

### 示例

以下是一个简单的 Ingress 示例 YAML 文件，它定义了如何将请求路由到不同的服务：

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: example-ingress
spec:
  rules:
  - host: example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: web-service
            port:
              number: 80
      - path: /api
        pathType: Prefix
        backend:
          service:
            name: api-service
            port:
              number: 80
```

在这个例子中，所有对 `example.com` 的请求都会被发送到 `web-service`，而所有对 `example.com/api` 的请求则会被发送到 `api-service`。

### 总结

Ingress 在 Kubernetes 中起着重要的作用，使得外部流量能够安全且灵活地访问集群中的服务。通过适当配置 Ingress 和 Ingress 控制器，可以有效地管理和优化应用程序的流量。