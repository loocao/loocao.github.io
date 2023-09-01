---
date: 2023-08-01
---
# Nginx设置最大传输大小

#card #nginx 

修改`/etc/nginx/nginx.conf`，放在`http`下

```nginx
client_max_body_size 2048m;
```

# 其它资料

- [[Nginx开启gzip]]
- [[Nginx反向代理配置]]