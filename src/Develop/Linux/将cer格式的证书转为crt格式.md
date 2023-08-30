# 将cer格式的证书转为crt格式

Basically there are two CER certificate encoding types, DER and Base64. When type DER returns an error loading certificate (asn1 encoding routines), try the PEM and it shall work.

```shell
openssl x509 -inform DER -in certificate.cer -out certificate.crt
```

```shell
openssl x509 -inform PEM -in certificate.cer -out certificate.crt
```