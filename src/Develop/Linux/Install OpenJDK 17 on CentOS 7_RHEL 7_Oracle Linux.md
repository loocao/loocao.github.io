# 在CentOS 7上安装OpenJDK 17

## 下载OpenJDK

打开OpenJDK下载页面：https://jdk.java.net/archive/ ，选择对应版本OpenJDK。

或者推荐使用Oracle OpenJDK：https://www.oracle.com/java/technologies/downloads/archive/

解压，

```
tar xvf openjdk-17*_bin.tar.gz -C /usr/lib/jvm
```

> CentOS的OpenJDK默认安装路径是`/usr/lib/jvm`，我们可以直接解压到此路径下。

## 设置默认Java版本

如果你的服务器上安装了多个版本的Java版本，可以通过以下方式设置默认Java版本。

首页，将OpenJDK 17添加到`/usr/bin/java`路径。

```
sudo alternatives --install /usr/bin/java java /usr/lib/jvm/jdk-17.0.5/bin/java 1
```

查看已经安装的Java版本。

```
alternatives --config java
```

输出：

```
There are 2 programs which provide 'java'.

  Selection    Command
-----------------------------------------------
*+ 1           java-11-openjdk.x86_64 (/usr/lib/jvm/java-11-openjdk-11.0.14.0.9-1.el7_9.x86_64/bin/java)
   2           /usr/lib/jvm/jdk-17.0.5/bin/java

Enter to keep the current selection[+], or type selection number: 2
```

可以看到OpenJDK 17在第二项，输出数字2，然后回车。

查看当前Java版本：

```
$ java -version
openjdk version "17.0.2" 2022-01-18
OpenJDK Runtime Environment Temurin-17.0.2+8 (build 17.0.2+8)
OpenJDK 64-Bit Server VM Temurin-17.0.2+8 (build 17.0.2+8, mixed mode, sharing)
```

# 设置JAVA_HOME

> 如果只是在服务器上安装Java，这一步已经不需要了。

```
vi /etc/profile
```

添加环境变量

```
export JAVA_HOME=/usr/lib/jvm/jdk-17.0.5
export PATH=$PATH:$JAVA_HOME/bin 
```

`/usr/lib/jvm/jdk-17.0.5`替换为你真正的路径。

应用：

```
source /etc/profile
```