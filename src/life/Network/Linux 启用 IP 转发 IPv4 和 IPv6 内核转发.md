---
title: Linux 启用 IP 转发 IPv4 和 IPv6 内核转发
date: 2025-02-07
category: 默认
tags:
  - IP
---
## IP转发概述

在本教程中，我们将看到如何在Linux上启用IP转发，这是一个非常简单的过程，并且我们将学习如何使它在系统上成为临时或永久的。IP转发允许操作系统(Linux) 像路由器一样转发数据包，或者更一般地说，将数据包路由到其他网络。IP转发的激活通常在侦听网络时使用(尤其是中级攻击者)，但在尝试使Linux计算机成为多个网络之间的路由器时，也更简单地使用它。

## 临时激活

查看目前状态

```sh
sysctl net.ipv4.ip_forward
sysctl net.ipv4.conf.all.src_valid_mark
sysctl net.ipv6.conf.all.forwarding
sysctl net.ipv6.conf.all.accept_ra
```

> 0 是禁用  1 是开启

**临时切换**  
临时修改,在`重启`或者使用 `sysctl` 时 会恢复默认

```sh
sysctl -w net.ipv4.ip_forward=1
sysctl -w net.ipv4.conf.all.src_valid_mark=1
sysctl -w net.ipv6.conf.all.forwarding=1
sysctl -w net.ipv6.conf.all.accept_ra=2
```

## 永久激活

永久激活需要编辑配置文件 `/etc/sysctl.conf`  
在文件末尾加入

```sh
net.ipv4.ip_forward = 1
net.ipv4.conf.all.src_valid_mark=1
net.ipv6.conf.all.forwarding = 1
net.ipv6.conf.all.accept_ra=2
```

立即生效

```sh
sysctl -p /etc/sysctl.conf
```

## 关联

[Wiregaurd开启IP转发](Wiregaurd开启IP转发.md)