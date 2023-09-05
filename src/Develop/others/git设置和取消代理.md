---
title: git设置和取消代理
date: 2023-09-05 16:26
category: 默认
tag: 
---

##  快捷命令

```sh
git config --global https.proxy http://127.0.0.1:7890
git config --global https.proxy https://127.0.0.1:7890
git config --global --unset http.proxy
git config --global --unset https.proxy
```

## 修改`~/.ssh/config`方式



1. https访问  
    仅为github.com设置socks5代理(推荐这种方式, 公司内网就不用设代理了, 多此一举):  
    `git config --global http.https://github.com.proxy socks5://127.0.0.1:1086`  
    其中1086是socks5的监听端口, 这个可以配置的, 每个人不同, 在macOS上一般为1086.  
    设置完成后, ~/.gitconfig文件中会增加以下条目:
    
    ```
[http "https://github.com"]
	proxy = socks5://127.0.0.1:7890
    ```
    
2. ssh访问  
    macOS系统，需要修改~/.ssh/config文件, 没有的话新建一个. 同样仅为github.com设置代理:
    
```
Host github.com
	User git
	ProxyCommand nc -v -x 127.0.0.1:7890 %h %p
```

	如果是在Windows下，则需要个性%home%.ssh\config, 其中内容类似于:

```
Host github.com
	User git
	ProxyCommand connect -S 127.0.0.1:7890 %h %p
```