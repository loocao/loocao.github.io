# 在Unraid中安装Entware

## 挂载/opt目录

Unraid系统在重启后，会自动清理掉非flash闪存里的其它目录，所以/opt目录里面的内容也会被清理，我们需要将不会被清理的其它目录挂载到/opt目录，步骤如下：

```shell
# 在/mnt/user/appdata目录下创建/opt目录
mkdir -p /mnt/user/appdata/opt
mount -o bind "/mnt/user/appdata/opt" /opt
```

Note : if the bind command doesn't work, try to create a link instead :

```shell
ln -s /mnt/user/appdata/opt/ /opt
```

## 安装Entware

Run install script depending on the processor (uname -m to know)

* armv8 (aarch64) - Realtek RTD129x

```
wget -O - http://bin.entware.net/aarch64-k3.10/installer/generic.sh | /bin/sh
```

* armv5
```
wget -O - http://bin.entware.net/armv5sf-k3.2/installer/generic.sh | /bin/sh
```

* armv7
```
wget -O - http://bin.entware.net/armv7sf-k3.2/installer/generic.sh | /bin/sh
```

* x64
```
wget -O - http://bin.entware.net/x64-k3.2/installer/generic.sh | /bin/sh
```

## 设置系统重启后自动启动Entware

将下面的脚本添加到User Scripts脚本中

```sh
#!/bin/sh

# Mount/Start Entware
mkdir -p /opt
mount -o bind "/mnt/user/appdata/opt" /opt
/opt/etc/init.d/rc.unslung start

# Add Entware Profile in Global Profile
if grep  -qF  '/opt/etc/profile' /etc/profile; then
	echo "Confirmed: Entware Profile in Global Profile"
else
	echo "Adding: Entware Profile in Global Profile"
cat >> /etc/profile <<"EOF"

# Load Entware Profile
. /opt/etc/profile
EOF
fi

# Update Entware List
/opt/bin/opkg update
```


其它资料：
1. https://github.com/Entware/Entware/wiki/Install-on-Synology-NAS