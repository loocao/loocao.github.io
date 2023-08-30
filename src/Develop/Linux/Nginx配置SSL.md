# Nginx配置SSL

#card #nginx 

通过[[使用ACME申请证书（证书自动续期）]]申请域名证书，存放`/etc/nginx/cert`目录下

修改Nginx配置

先开启443端口，在`server`下添加

```nginx
listen      443 ssl;
```

然后再添加如下配置，

```nginx
  server_tokens off;
  ssl_session_cache shared:SSL:10m;
  ssl_session_timeout 60m;
  ssl_session_tickets on;
  ssl_stapling off;
  ssl_stapling_verify off;
  ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
  ssl_prefer_server_ciphers on;

  ssl_ciphers "EECDH+AESGCM:EDH+AESGCM:ECDHE-RSA-AES128-GCM-SHA256:AES256+EECDH:DHE-RSA-AES128-GCM-SHA256:AES256+EDH:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-SHA384:ECDHE-RSA-AES128-SHA256:ECDHE-RSA-AES256-SHA:ECDHE-RSA-AES128-SHA:DHE-RSA-AES256-SHA256:DHE-RSA-AES128-SHA256:DHE-RSA-AES256-SHA:DHE-RSA-AES128-SHA:ECDHE-RSA-DES-CBC3-SHA:EDH-RSA-DES-CBC3-SHA:AES256-GCM-SHA384:AES128-GCM-SHA256:AES256-SHA256:AES128-SHA256:AES256-SHA:AES128-SHA:DES-CBC3-SHA:HIGH:!aNULL:!eNULL:!EXPORT:!DES:!MD5:!PSK:!RC4";

  ssl_certificate /etc/nginx/cert/domain.pem;
  ssl_certificate_key /etc/nginx/cert/domain.key;
```

# 其它资料

- [[Nginx配置SSL]]
- [[Nginx开启gzip]]
- [[Nginx设置最大传输大小]]
- [[Nginx反向代理配置]]