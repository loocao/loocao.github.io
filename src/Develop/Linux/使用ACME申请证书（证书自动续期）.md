# 使用ACME申请证书（证书自动续期）

## （一）ACME安装

```sh
curl  https://get.acme.sh | sh
```

## （二）更改默认证书

```sh
acme.sh --set-default-ca  --server  letsencrypt
```

acme被ZeroSSL收购，其默认的证书方式为ZeroSSL，但此证书生成时会携带邮箱，因此更换为letsencrypt。

当然，也可以在生成证书时加一个`--server`参数来决定生成什么证书

```sh
--server letsencrypt
```

## （三）生成证书

使用`acme.sh --issue`命令生成证书，但生成证书的同时会进行域名的所有权的验证。 acme.sh 有两种方式验证：`HTTP` 和 `DNS` 验证。

> 注意：如果需要生成泛域名（*.a.com）的证书，不能使用HTTP认证域名，需要改用DNS认证的方式

### 1) HTTP验证方式

#### a. 生成证书

```sh
acme.sh --issue -d loocao.top --nginx /etc/nginx/nginx.conf
```

### 2) DNS验证方式

需要在域名上添加一条 txt 解析记录, 验证域名所有权

#### 方式1：手动添加记录

a. 生成txt解析内容

```sh
acme.sh  --issue  --dns -d mydomain.com \
 --yes-I-know-dns-manual-mode-enough-go-ahead-please
```

以上mydomain.com只是测试域名，如果多个域名，则需多次使用-d配置，如`-d www.a.com -d img.a.com`

b. 把txt解析添加到域名管理面板中

c. 重新生成证书

```sh
acme.sh  --renew -d mydomain.com \
  --yes-I-know-dns-manual-mode-enough-go-ahead-please
```

#### 注意，重新生成使用的是`renew`参数，把生成txt解析内容命令的`issue`改为`renew`

#### 方式2：域名提供商api自动解析

##### a. 在域名提供商中，生成你的 api id 和 api key并记录，以dnspod为例

![978b084fc1f38e5b606b2f085df7cdb1.png](../../_resources/978b084fc1f38e5b606b2f085df7cdb1.png)

##### b. 引入api id和key，以dnspod为例

```sh
export DP_Id="1234"
export DP_Key="sADDsdasdgdsf"
```

不同提供商，API参数值各不同，可参考下面的表格：自动 DNS API 集成

#### c. 生成证书

```sh
acme.sh --issue --dns dns_ali --server letsencrypt -d aa.com -d www.aa.com
```

`--dns`的配置值也是根据域名提供商来决定，`dns_dp`表示`dnspod`。更多参数值可看下方表格

表：自动 DNS API 集成

| 服务商名称 | 服务商简称 | 所需API参数 | 获取API参数地址 |
| --- | --- | --- | --- |
| cloudxns | cx  | export CX_Key="123456"<br>export CX_Secret="abcdef" | https://www.cloudxns.net/AccountManage/apimanage.html |
| dnspod.cn | dp  | export DP_Id="123456"<br>export DP_Key="abcdef" | https://www.dnspod.cn/console/user/security |
| aliyun | ali | export Ali_Key="123456"<br>export Ali_Secret="abcdef" | https://www.dnspod.cn/console/user/security |
| cloudflare | cf  | export CF_Key="123456"<br>export CF_Email="abc@example.com" | https://dash.cloudflare.com/profile/api-tokens |
| linode | linode | export LINODE\_API\_KEY="123456" | https://manager.linode.com/profile/api |
| he  | he  | export HE_Username="username"<br>export HE_Password="password" | [he](https://dns.he.net/)的用户名密码 |
| digitalocean | dgon | export DO\_API\_KEY="123456" | https://cloud.digitalocean.com/settings/applications |
| namesilo | namesilo | export Namesilo_Key="123456" | https://www.namesilo.com/account_api.php |
| aws | aws | export AWS\_ACCESS\_KEY_ID=123456<br>export AWS\_SECRET\_ACCESS_KEY=abcdef | [http://docs.aws.amazon.com/IAM/latest/UserGuide/id\_users\_create.html](http://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html) |
| namecom | namecom | export Namecom_Username="username"<br>export Namecom_Token="123456" | https://www.name.com/reseller/apply |
| freedns | freedns | export FREEDNS_User="username"<br>export FREEDNS_Password="password" | [freedns](https://freedns.afraid.org/)的用户名密码 |
| godaddy | gd  | export GD_Key="123456"<br>export GD_Secret="abcdef" | https://developer.godaddy.com/keys/ |
| yandex | yandex | export PDD_Token="abcdef" | https://tech.yandex.com/domain/doc/concepts/access-docpage/ |

更多dnsapi的使用，可以查看[文档](https://github.com/acmesh-official/acme.sh/wiki/dnsapi)

## （四）copy/安装 证书

默认生成的证书都放在安装目录下: `~/.acme.sh/`，但是不要在web服务器中直接引用目录下的证书文件，也不要手动来拷贝证书文件到具体的web服务器中，手动拷贝会导致之后更新证书流程不能完全自动。

正确方式是使用acme.sh的安装证书命令，acme.sh自动拷贝证书文件到具体目录中，拷贝命令会被记录下来，之后自动更新证书流程也会执行此拷贝步骤，从而实现更新证书流程的完全自动化。

格式例子如下：

```sh
acme.sh --install-cert -d xxx \
        --cert-file xxx \
        --key-file xxx \
        --fullchain-file xxx\
        --reloadcmd xxx
```

根据web服务器需要的文件按需引入对应的参数，reloadcmd定义证书更新后重启对应的web服务命令。

以nginx为例：

```sh
acme.sh --install-cert -d www.a.com -d img.a.com \
        --key-file   /etc/nginx/cert/domain.key  \
        --fullchain-file /etc/nginx/cert/domain.pem \
        --reloadcmd     "service nginx force-reload"
```

## （五）web服务使用证书

通过上一步安装证书，已经把证书拷贝到目标的目录，接下来就是在web服务中使用证书即可。

以nginx为例：

```nginx
...
server {
  listen       443 ssl;
  ssl_certificate      /etc/nginx/cert_file/fullchain.pem;
  ssl_certificate_key  /etc/nginx/cert_file/key.pem;
  # ...
}
```

### 更新证书

目前证书在 60 天以后会自动更新，你无需任何操作，因为在acme.sh安装时，已经把相关的自动更新程序写入到crontab中，如果想要查看，可以通过以下命令：

```sh
crontab -l
```

输出内容包含一个自动更新程序，大致内容如下：

```crontab
56 * * * * "/root/.acme.sh"/acme.sh --cron --home "/root/.acme.sh" > /dev/null
```

### 停止自动更新

```sh
acme.sh --remove -d example.com
```

或者手动在`~/.acme.sh/`目录下删除对应的域名目录，如`~/.acme.sh/a.com`。

## 其它资料

- [[Nginx配置SSL]]