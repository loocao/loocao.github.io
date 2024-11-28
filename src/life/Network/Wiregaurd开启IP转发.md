---
title: Wiregaurd开启IP转发
date: 2024-11-28
category: Network
tags:
  - Wireguard
---
首先参考 [[../../Develop/Linux/Linux 启用 IP 转发 IPv4 和 IPv6 内核转发|Linux 启用 IP 转发 IPv4 和 IPv6 内核转发]] 开启Linux的IPv6内核转发

## 修改wireguard配置文件

然后修改wireguard配置文件，添加以下配置：
```sh
PostUp = iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE  
PostUp = ip6tables -t nat -A POSTROUTING -o eth0 -j MASQUERADE

PostDown = iptables -t nat -D POSTROUTING -o eth0 -j MASQUERADE
PostDown = ip6tables -t nat -D POSTROUTING -o eth0 -j MASQUERADE
```

> 注意修改其中的`enp1s0`为实际网络接口名称。

### 指定IP
```sh
PostUp = iptables -t nat -A POSTROUTING -s 10.8.8.0/24 -o eth0 -j MASQUERADE
PostUp = ip6tables -t nat -A POSTROUTING -s fd08::/64 -o eth0 -j MASQUERADE

PostDown = iptables -t nat -D POSTROUTING -s 10.8.8.0/24 -o eth0 -j MASQUERADE
PostDown = ip6tables -t nat -D POSTROUTING -s fd08::/64 -o eth0 -j MASQUERADE
```

## 配置防火墙允许转发

如果修改了wireguard配置文件依然不通，则有可能是防火墙拦截了，添加以下配置允许防火墙转发，或者关闭防火墙。

```sh
PostUp = iptables -A FORWARD -i %i -j ACCEPT
PostUp = iptables -A FORWARD -o %i -j ACCEPT

PostUp = ip6tables -A FORWARD -i %i -j ACCEPT
PostUp = ip6tables -A FORWARD -o %i -j ACCEPT

PostDown = iptables -D FORWARD -i %i -j ACCEPT
PostDown = iptables -D FORWARD -o %i -j ACCEPT

PostDown = ip6tables -D FORWARD -i %i -j ACCEPT
PostDown = ip6tables -D FORWARD -o %i -j ACCEPT
```

## 完整示例

```ini
[Interface]
PrivateKey=eB3CKiNYzRla7j0xjg/QnSb0aaGCCcJMj2KNeEBfNF4=
Address=10.8.56.1/32, fd56::1/128
ListenPort=5821
MTU=1280

PostUp = iptables -A FORWARD -i %i -j ACCEPT
PostUp = iptables -A FORWARD -o %i -j ACCEPT
PostUp = iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE

PostUp = ip6tables -A FORWARD -i %i -j ACCEPT
PostUp = ip6tables -A FORWARD -o %i -j ACCEPT
PostUp = ip6tables -t nat -A POSTROUTING -o eth0 -j MASQUERADE

PostDown = iptables -D FORWARD -i %i -j ACCEPT
PostDown = iptables -D FORWARD -o %i -j ACCEPT
PostDown = iptables -t nat -D POSTROUTING -o eth0 -j MASQUERADE

PostDown = ip6tables -D FORWARD -i %i -j ACCEPT
PostDown = ip6tables -D FORWARD -o %i -j ACCEPT
PostDown = ip6tables -t nat -D POSTROUTING -o eth0 -j MASQUERADE

[Peer]
PersistentKeepalive=25
PublicKey=XhNovO6I4hp9GEKrPMt1dfannOXbMNNS8ggCfGkzsxo=
AllowedIPs=10.8.56.10/32, fd56::10/128, 10.18.5.0/24

[Peer]
PublicKey=f8lUcJmgDDkQT5EluOakGsla/dKuog1gsZxgtrhFaQQ=
AllowedIPs=10.8.56.60/32, fd56::60/128
```