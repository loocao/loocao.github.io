SSH 密钥对可以让您方便的登录到 SSH 服务器，而无需输入密码。由于您无需发送您的密码到网络中，SSH 密钥对被认为是更加安全的方式。再加上使用密码短语 (passphrase) 的使用，安全性会更上一层楼。

同时，我们可以使用 SSH agent 来帮助我们记住密码短语，无需我们记住每一个密钥对的密码短语，减轻了我们的负担。

本文将为您介绍如何管理密钥对，以方便的连接到您的 SSH 服务器。本文默认您已经熟知 SSH，并安装好位于官方软件仓库 的 openssh。

# 背景

SSH 密钥对总是成双出现的，一把公钥，一把私钥。公钥可以自由的放在您所需要连接的 SSH 服务器上，而私钥必须稳妥的保管好。

所谓"公钥登录"，原理很简单，就是用户将自己的公钥储存在远程主机上。登录的时候，远程主机会向用户发送一段随机字符串，用户用自己的私钥加密后，再发回来。远程主机用事先储存的公钥进行解密，如果成功，就证明用户是可信的，直接允许登录 shell，不再要求密码。这样子，我们即可保证了整个登录过程的安全，也不会受到中间人攻击。

# 生成密钥对

我们可以使用 ssh-keygen 命令生成密钥对

```
$ ssh-keygen -t ecdsa -b 521 -C "$(whoami)@$(hostname)-$(date -I)"
Generating public/private ecdsa key pair.
Enter file in which to save the key (/home/username/.ssh/id_ecdsa):
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /home/username/.ssh/id_ecdsa.
Your public key has been saved in /home/username/.ssh/id_ecdsa.pub.
The key fingerprint is:
dd:15:ee:24:20:14:11:01:b8:72:a2:0f:99:4c:79:7f username@localhost-2011-12-22
The key's randomart image is:
+--[ECDSA  521]---+
|     ..oB=.   .  |
|    .    . . . . |
|  .  .      . +  |
| oo.o    . . =   |
|o+.+.   S . . .  |
|=.   . E         |
| o    .          |
|  .              |
|                 |
+-----------------+
```

在上面这个例子中，ssh-keygen 生成了一对长度为 521 bit (-b 521) 的 ECDSA (-t ecdsa) 加密的密钥对，comment 为 -C "$(whoami)@$(hostname)-$(date -I)"。而 randomart image 是 OpenSSH 5.1 引入的一种简单的识别指纹 (fingerprint) 的图像。

## 选择合适的加密方式

椭圆曲线数字签名算法 (ECDSA) 生成的密钥更小，安全性更高。OpenSSH 5.7 建议默认使用 ECDSA，详情参见 OpenSSH 5.7 Release Notes。较旧的 OpenSSH 版本可能不支持 ECDSA 密钥，需要注意。而一些厂商因专利问题，暂未提供 ECDSA 的实现。
> 注意: 截至 2014 年06 月 10 日，这个 GNOME bug 导致 Gnome Keyring 暂不支持 ECDSA。

如果您要生成 RSA (768-16384 bit) 或者 DSA (1024 bit) 密钥对，需要使用 -t rsa 或者 -t dsa，并修改 -b 选项。-b 可以省略，ssh-keygen 会生成一个默认大小的密钥对。
> 注意: 这些密钥对是用于认证的，选择更加复杂的密钥类型并不会在登录时加重您的 CPU 负担。

## 选择密钥存储位置以及密码短语

输入 ssh-keygen 时，它会询问您将密钥对保存到何处，文件名如何命令等。默认情况下，密钥对保存到 ~/.ssh 下，文件名则根据加密类型自动命名为 id_ecdsa (私钥)，id_ecdsa.pud (公钥)。建议您采用默认的存储位置和文件名。

而在 ssh-keygen 请求您输入一个密码短语时，您应该输入一些难以猜到的短语。如果短语足够随机和复杂，则私钥落入贼人之手时就不会容易被破解掉。

当然，您也可以不输入任何密码短语，也能够生成所需的密钥对。虽然这用起来挺方便的，但是您应该知道这会很危险。在没有输入密码短语的情况下，您的私钥未经加密就存储在您的硬盘上，任何人拿到您的私钥都可以随意的访问对应的 SSH 服务器。还有一种情况，如果您不是 root 用户，则该机器上的 root 用户可以完全拥有您的密钥对，因为他的权限是最大的。

### 不修改密钥对的情况下修改密码短语

您可以使用 `ssh-keygen` 命令来修改密码短语，而无需改动密钥对。假设您要修改的密钥对使用 RSA 加密，输入以下命令即可：
```
$ ssh-keygen -f ~/.ssh/id_rsa -p
```

### 管理多组密钥对

您可以创建 `~/.ssh/config` 来管理多组密钥对，每一个 SSH 服务器对应一组密钥对。或者，您甚至可以对所有的 SSH 服务器使用同一组密钥对。不过如果您觉得这样不合适，还是编辑配置文件：

```
~/.ssh/config
Host SERVERNAME1
  IdentitiesOnly yes
  IdentityFile ~/.ssh/id_rsa_SERVER1
  # CheckHostIP yes
  # Port 22
Host SERVERNAME2
  IdentitiesOnly yes
  IdentityFile ~/.ssh/id_rsa_SERVER2
  # CheckHostIP no
  # Port 2177
ControlMaster auto
ControlPath /tmp/%r@%h:%p
```
更多选项帮助请参考
```
$ man ssh_config 5
```

# 将公钥复制到远程服务器上

创建好密钥对之后，您需要将公钥上传到远程服务器上，以便用于 SSH 密钥认证登录。公钥文件名和私钥文件名相同，只不过公钥文件带有扩展名 .pub 而私钥文件名则没有。千万不要将私钥上传，私钥应该保存在本地。

## 简单的方法

> 注意: 如果您的远程服务器默认使用的是 non-sh 的 shell，比如 tcsh，则此方法可能不奏效。详情参见这个 [bug](https://bugzilla.redhat.com/show_bug.cgi?id=1045191)。
> 注意: 如果使用以下两种方法外的方法请不要忘记注册公钥文件，您只需要命令
```
$ cat ~/.ssh/id_ecdsa.pub >> ~/.ssh/authorized_keys
```
如果您的私钥文件为 ~/.ssh/id_rsa.pub，您只需要输入命令
```
$ ssh-copy-id remote-server.org
```
如果您的远程服务器用户名与本地的不同，您需要指明用户名
```
$ ssh-copy-id username@remote-server.org
```
如果您的私钥文件名不是默认的，您会得到错误 /usr/bin/ssh-copy-id: ERROR: No identities found。这种情况下，您需要修改命令为
```
$ ssh-copy-id -i ~/.ssh/id_ecdsa.pub username@remote-server.org
```
如果远程服务器监听端口不是 22,您也需要指明端口
```
$ ssh-copy-id -i ~/.ssh/id_ecdsa.pub -p 221 username@remote-server.org
```

## 传统的方法

使用命令
```
$ scp ~/.ssh/id_ecdsa.pub username@remote-server.org:
```
将公钥上传到服务器。注意，该命令最末的 : 不可省略。上传成功之后，先使用口令登录到服务器，将公钥文件重命名为 authorized_keys，并移动到 ~/.ssh 下，若 ~/.ssh 不存在则新建一个。
```
$ ssh username@remote-server.org
username@remote-server.org's password:
$ mkdir ~/.ssh
$ cat ~/id_ecdsa.pub >> ~/.ssh/authorized_keys
$ rm ~/id_ecdsa.pub
$ chmod 600 ~/.ssh/authorized_keys
```
上面最后两个命令移除服务器上的公钥，并设置 authorized_keys 的权限为只有您，也即文件拥有者，有读写权限。

# 安全性

## 保证 authorized_keys 文件的安全

为了保证安全，您应该阻止其他用户添加新的公钥。

将 `authorized_keys` 的权限设置为对拥有者只读，其他用户没有任何权限：
```
$ chmod 400 ~/.ssh/authorized_keys
```
为保证 authorized_keys 的权限不会被改掉，您还需要设置该文件的 immutable 位权限：
```
# chattr +i ~/.ssh/authorized_keys
```
然而，用户还可以重命名 ~/.ssh，然后新建新的 ~/.ssh 目录和 authorized_keys 文件。要避免这种情况，您需要设置 ~./ssh 的 immutable 位权限：
```
# chattr +i ~/.ssh
```
> 注意: 如果您需要添加新的公钥，您需要移除 authorized_keys 的 immutable 位权限。然后，添加好新的公钥之后，按照上述步骤重新加上 immutable 位权限。

## 禁用密码登录

将公钥上传到 SSH 服务器上之后，您就不再需要输入 SSH 账户密码来登录了。直接使用账户密码登录容易受到暴力破解的攻击。倘若您没有提供 SSH 私钥，默认情况下，SSH 服务器就会让您直接使用密码登录，这就有可能让不法之徒来猜测您的密码，有一定的安全隐患。要禁用这一行为，您需要编辑 SSH 服务器上的 /etc/ssh/sshd_config：

```
/etc/ssh/sshd_config
PasswordAuthentication no
ChallengeResponseAuthentication no
```

## 双因素认证与公钥

从 OpenSSH 6.2 开始，您可以使用 AuthenticationMethods 选项来自己添加工具链进行认证。这样就可以配合公钥使用双因素认证了。

谷歌身份验证器设置请参考 [Google Authenticator](https://wiki.archlinux.org/index.php/Google_Authenticator)。

如果您使用 PAM (Pluggable Authentication Module，插入式验证模块)，编辑下面这几行：

```
/etc/ssh/sshd_config
-----
ChallengeResponseAuthentication yes
AuthenticationMethods publickey,keyboard-interactive:pam
```

```
/etc/pam.d/sshd
-----
#%PAM-1.0
auth required pam_google_authenticator.so
```

如果您设置 PAM 仅使用 pam_google_authenticator.so，则 sshd 则会采用双因素认证，而无需密码。如果双因素认证失败，即使有有效的公钥，sshd 也不允许登录。您可以加上 nullok 选项来允许用户使用公钥登录：

```
/etc/pam.d/sshd
-----
#%PAM-1.0
auth required pam_google_authenticator.so nullok
```

链接地址: https://wiki.archlinux.org/index.php/SSH_keys_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)

# 关联

[[Linux下开启SSH，并且允许root用户远程登录]]