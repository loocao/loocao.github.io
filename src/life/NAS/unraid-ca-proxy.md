---
title: 设置Unraid的应用默认走代理
date: 2024-10-11
category: Unraid
tags:
  - Unraid
  - Proxy
---
## 起因

Unraid的ca使用的github的资源，默认情况下是访问不了的，这也导致插件不能直接安装。

## 原理

ca的底层下载使用的是wget命令，而wget命令可以通过修改配置文件`~/.wgetrc`来设置默认走代理，设置如下:
```sh
https_proxy = http://10.8.5.2:7893/
http_proxy = http://10.8.5.2:7893/

use_proxy = on
```
> 修改`https_proxy`和`http_proxy`的值为自己的代理IP端口

`use_proxy`可以设置为`on/off`，设置为`off`时，则`wget`命令不通过代理下载。

通过以上方式可以实现ca插件安装也走代理了。

## 相关文档

-  [wget文档](https://www.gnu.org/software/wget/manual/wget.html)
