# Linux内核优化

## 查看Linux内核参数命令

```sh
sysctl -a
```

通过`grep`过滤显示指定的参数

### `sysctl`命令
用法：
`sysctl [options] [variable[=value] …]`

常用选项：
`-n`：打印时只打印值，不打印参数名称；
`-e`：忽略未知关键字错误；
`-N`：打印时只打印参数名称，不打印值；
`-w`：设置参数的值（不过好像不加这个选项也可以直接设置）；
`-p`：从配置文件“/etc/sysctl.conf”加载内核参数设置；
`-a`：打印所有内核参数变量；
`-A`：以表格方式打印所有内核参数变量。


## 常用Linux内核参数

```properties
# 是否启用IP转发（如果做路由需要开启此项）
net.ipv4.ip_forward = 0 
# 是否为所有接口上源地址有效的数据包打标记。如果设置为1，则Linux内核会检查源地址的有效性，如果设置为0，则Linux内核不会检查源地址的有效性。
net.ipv4.conf.all.src_valid_mark = 1
```



## 修改内核参数

- 临时修改

```sh
sysctl -w net.ipv4.ip_forward=1
```

- 永久修改

```sh
vim /etc/sysctl.conf
sysctl -p
```

## 参考
- [Linux内核优化](https://www.cnblogs.com/augusite/p/10774014.html)