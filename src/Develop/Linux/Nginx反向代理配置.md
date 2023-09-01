---
date: 2023-08-01
---
# Nginx反向代理配置

#card #nginx 

配置路径`/etc/nginx/conf.d`

```nginx
server {
  listen      80;
  server_name a.com;

  location / {
    proxy_pass       http://127.0.0.1:9000/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection $connection_upgrade;
    
    proxy_set_header Host $http_host;

    proxy_set_header X-Real-IP         $remote_addr;
    proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Forwarded-Host  $host;
    proxy_set_header X-Forwarded-Port  $server_port;

  }

}
```

`proxy_http_version 1.1`定义用于代理的HTTP协议版本，默认情况下将其设置为1.0。对于Websocket和`keepalive`连接，您需要使用1.1版。

`proxy_cache_bypass $http_upgrade`设置websocket不从缓存中获取响应，而是直接通过应用。

`Upgrade $http_upgrade`和`Connection "upgrade"`如果您的应用程序使用Websockets，则这些字段是必填字段。

>`Connection "upgrade"`或者配置为`Connection $connection_upgrade`，并在nginx配置中添加

```nginx
map $http_upgrade $connection_upgrade {
  default Upgrade;
  '' close;
}
```

`X-Real-IP $remote_addr`将真实的客户端地址转发到应用，如果没有设置，你应用获取到将会是Nginx服务器IP地址。

`X-Forwarded-For $proxy_add_x_forwarded_for`转发客户端请求头的`X-Forwarded-For`字段到应用。

如果客户端请求头中不存在`X-Forwarded-For`字段，则`$proxy_add_x_forwarded_for`变量等同于`$remote_addr`变量

`X-Forwarded-Proto $scheme`这将会转发客户端所使用的HTTP协议或者是HTTPS协议。

​​`X-Forwarded-Host $host`转发客户端请求的原始主机到应用。`X-Forwarded-Port $server_port`定义客户端请求的原始端口。

# 其它资料

- [[Nginx设置最大传输大小]]
- [[Nginx设置最大传输大小]]