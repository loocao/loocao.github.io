---
title: Linux下开启SSH，并且允许root用户远程登录
date: 2023-08-01
---
# SSH配置

## 允许root用户远程登录

修改ssh服务配置文件
```sh
vim /etc/ssh/sshd_config
```
调整`PermitRootLogin`参数值为`yes`，如下图：
![[../../_resources/Pasted image 20230810172241.png]]

## 设置是否使用口令验证

同上，修改ssh服务配置文件：
修改`PasswordAuthentication`参数值为`yes`

## 允许无密码登录

同上，修改ssh服务配置文件，两种情况：
1. 将`PermitEmptyPasswords yes`前面的#号去掉
2. 将`PermitEmptyPasswords` 参数值修改为yes，如下图：
![[../../_resources/Pasted image 20230810172328.png]]
![[../../_resources/Pasted image 20230810172334.png]]
无论哪种，最后`PermitEmptyPasswords`参数值为yes

以上两种配置，均需要重启ssh服务
```sh
service sshd restart  
```
或者
```sh
/etc/initd.d/sshd restart
```
# 其它

## 修改root密码

执行：
```sh
sudo -i
passwd
```

# 链接

[[SSH keys (简体中文)]]