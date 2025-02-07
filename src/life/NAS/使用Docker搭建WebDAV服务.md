---
title: 使用Docker搭建WebDAV服务
date: 2025-02-07
category: 默认
tags:
  - Docker
  - WebDAV
---
Docker 仓库: https://registry.hub.docker.com/r/hacdias/webdav

## 创建配置文件

```yaml
# Server related settings
address: 0.0.0.0
port: 5082
auth: true
tls: false
cert: cert.pem
key: key.pem
prefix: /
debug: false

# Default user settings (will be merged)
scope: .
modify: true
rules: []

# CORS configuration
cors:
  enabled: true
  credentials: true
  allowed_headers:
    - Depth
  allowed_hosts:
    - http://localhost:5082
  allowed_methods:
    - GET
  exposed_headers:
    - Content-Length
    - Content-Range

users:
  - username: admin
    password: admin
    scope: /data
  - username: encrypted
    password: "{bcrypt}$2y$10$zEP6oofmXFeHaeMfBNLnP.DO8m.H.Mwhd24/TOX2MWLxAExXi4qgi"
  - username: "{env}ENV_USERNAME"
    password: "{env}ENV_PASSWORD"
  - username: basic
    password: basic
    modify:   false
    rules:
      - regex: false
        allow: false
        path: /some/file
      - path: /public/access/
        modify: true
```

将config.yaml所在目录映射进容器，并在启动参数指定config为容器内config.yml

## 参考

```docker
docker run -d --name webdav-go -v /media:/data/media -v /docker/webdav:/config -p 8081:8081 --restart unless-stopped hacdias/webdav:latest --config /config/config.yml
```
