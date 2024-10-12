---
date: 2023-08-01
---
# linux查看系统的硬件信息

## CPU

### cpu的统计信息
```sh
lscpu
```
命令，查看的是cpu的统计信息.

### 每个cpu信息

```sh
cat /proc/cpuinfo
```
可以知道每个cpu信息，如每个CPU的型号，主频等。

## 内存

### 概要查看内存情况

```sh
free -m
```

这里的单位是MB。

### 查看内存详细使用

```sh
cat /proc/meminfo
```

### 查看内存硬件信息

```sh
dmidecode -t memory
```


## 磁盘

### 查看硬盘和分区分布

```sh
lsblk
```

### 查看硬盘和分区的详细信息

```sh
fdisk -l
```

### 查看硬盘列表

```sh
ls -la /dev/disk/by-id/|grep -v dm|grep -v lvm|grep -v part
```

nvme开头的是nvme硬盘，ata开头是走sata或者ata通道的设备。，scsi是scsi设备-阵列卡raid或者是直通卡上的硬盘。

## 网卡

### 查看网卡硬件信息

```sh
lspci | grep -i 'eth'
```

### 查看系统的所有网络接口

```sh
ifconfig -a
```

或者是

```sh
ip link show
```

如果要查看某个网络接口的详细信息，例如eth0的详细参数和指标

```sh
ethtool eth0
```

## 其他

### 查看pci信息

即主板所有硬件槽信息。

```sh
lspci
```

如果要更详细的信息:lspci -v 或者 lspci -vv

如果要看设备树:lscpi -t

### 查看bios信息

```sh
dmidecode -t bios
```

dmidecode以一种可读的方式dump出机器的DMI(Desktop Management Interface)信息。这些信息包括了硬件以及BIOS，既可以得到当前的配置，也可以得到系统支持的最大配置，比如说支持的最大内存数等。

如果要查看所有有用信息

```sh
dmidecode -q
```

里面包含了很多硬件信息。