---
date: 2023-08-01
---
# Nginx开启gzip

#card #nginx

修改`/etc/nginx/nginx.conf`，放在`http`下

```nginx
    #决定是否开启gzip模块，on表示开启，off表示关闭；
    gzip on;
    # 设置允许压缩的页面最小字节(从header头的Content-Length中获取) ，当返回内容大于此值时才会使用gzip进行压缩,以K为单位,当值为0时，所有页面都进行压缩。建议大于1k
    gzip_min_length 1k;
    # 设置gzip申请内存的大小,其作用是按块大小的倍数申请内存空间,param2:int(k) 后面单位是k。这里设置以16k为单位,按照原始数据大小以16k为单位的4倍申请内存
    gzip_buffers 4 16k;
    # 识别http协议的版本,早起浏览器可能不支持gzip自解压,用户会看到乱码
    gzip_http_version 1.1;
    # 设置gzip压缩等级，等级越底压缩速度越快文件压缩比越小，反之速度越慢文件压缩比越大；等级1-9，最小的压缩最快 但是消耗cpu
    gzip_comp_level 9;
    # 设置需要压缩的MIME类型,非设置值不进行压缩，即匹配压缩类型
    gzip_types text/plain application/x-javascript text/css application/xml text/javascript application/x-httpd-php application/javascript application/json;
    # 启用应答头"Vary: Accept-Encoding"
    gzip_vary on;

    # nginx做为反向代理时启用,off(关闭所有代理结果的数据的压缩),expired(启用压缩,如果header头中包括"Expires"头信息),no-cache(启用压缩,header头中包含"Cache-Control:no-cache"),no-store(启用压缩,header头中包含"Cache-Control:no-store"),private(启用压缩,header头中包含"Cache-Control:private"),no_last_modefied(启用压缩,header头中不包含"Last-Modified"),no_etag(启用压缩,如果header头中不包含"Etag"头信息),auth(启用压缩,如果header头中包含"Authorization"头信息)
    gzip_proxied off;
    # (IE5.5和IE6 SP1使用msie6参数来禁止gzip压缩 )指定哪些不需要gzip压缩的浏览器(将和User-Agents进行匹配),依赖于PCRE库
    gzip_disable "MSIE [1-6]\.";
```

# 其它资料

- [[Nginx设置最大传输大小]]
- [[Nginx反向代理配置]]