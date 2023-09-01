---
date: 2023-08-01
---
# Ubuntu替换阿里源快捷操作
## 快速命令

```sh
sed -i 's/http:\/\/archive.ubuntu.com\/ubuntu/https:\/\/mirrors.aliyun.com\/ubuntu/g' /etc/apt/sources.list
```

## 基本语法

`s`（substitute）为查找替换命令

```
# 在输出或打印中，替换字符串。并不改变原文件内容
sed '作用范围s/替换查找目标/替换成为/替换目标option' 文件名

# 替换字符串，并更改原文件内容
# 在sed后面加 -i,即编辑文档“edit files in place”选项
sed -i '作用范围s/替换查找目标/替换成为/替换目标option' 文件名
```

例，sed ‘s/cat/dog/g’ pet.txt
在全局范围(s前的作用范围无内容)查找cat并替换为dog，作用范围内每一行出现的不仅第一个目标，而是所有目标都会被替换（g）。

## 作用范围选项

- 作用范围在全文的每一行，不写内容

```
# 作用范围在全文
sed 's/cat/dog/g' pet.txt
```

这一点这vim中的作用范围不太一样，vim中不写作用范围是作用于光标所在的当前行，而sed是指全文范围的每一行。

- 指定行，写上行号；指定某行到某行，用逗号连接行号

```
# 作用范围在第1行
sed '1s/cat/dog/g' pet.txt

# 作用范围在第6行到第10行
sed '6,10s/cat/dog/g' pet.txt

# 作用范围在第6行到最后一行
sed '6,$s/cat/dog/g' pet.txt

# 作用范围在指定行到其后2行，用加号(减号不可用)
sed '1,+2s/cat/dog/g' pet.txt
```

## 替换查找目标 写法

- 替换某个字符串，就写这个字符串。

这是最基本的用法。

```
# 替换cat这个字符串
sed '1s/cat/dog/g' pet.txt
```

- 替换整行，用`.*`

```
# 替换第1行一整行为dog
sed '1s/.*/dog/' pet.txt
# 这里因为.*已代表一整行，所有后面写上/g和上面相同效果
sed '1s/.*/dog/g' pet.txt

# 替换全文的每1行为dog
sed 's/.*/dog/' pet.txt
# 这里因为.*已代表一整行，所有后面写上/g和上面相同效果
sed 's/.*/dog/g' pet.txt
```

- 替换一个字符，用`.`

```
# 替换第1行的每一个字符
sed '1s/./dog/g' pet.txt

# 替换第1行的第1个字符
sed '1s/./dog/' pet.txt

# 替换第1行的第5个字符
sed '1s/./dog/5' pet.txt
```

## 替换目标option

- 前面出现的`g`，作用范围内行的所有查找目标，而不仅是第一个查找目标

```
# 替换全文每一行的每一个 cat 为 dog
sed 's/cat/dog/g' pet.txt
```

- 没有g，作用范围内所在行的第1个目标

```
# 替换全文每一行的第1个 cat 为 dog
sed 's/cat/dog/' pet.txt
```

- 不打印出全文，仅打印更改所涉及行，或者说仅打印受影响的行
    在sed后面加 -n,是阻止默认的自动打印模式的选项，
    同时在 替换目标option 的位置 写上 p，表明打印print。

```
# 打印发生替换的行
sed -n 's/cat/dog/gp' pet.txt
```

## sed的y命令

不同于上面的`s`命令，以字符串或模式为单位替换为一个整体，y是罗列置换每个对应的字符。

### 语法

```
sed 'y/查找的各个字符/对应替换后的各个字符/' 文件名
```

`sed ‘y/abc/123’ test.txt` ，这个命令会依次替换a，b，c为1，2，3 。
`查找的各个字符`与`对应替换后的各个字符`的长度要一致。

例，

```
$ echo 'a,b,c,d,e'|sed 'y/abcde/12345/'
1,2,3,4,5

$ cat test.txt
a,b,c
a,b,c
$ sed 'y/abcde/12345/' test.txt
1,2,3
1,2,3
```

再比如 `$ sed ‘1,5y/abcde/ABCDE/’ test.txt` 是把1-5行内所有abcde转变为大写，但是，正则表达式元字符不能使用这个命令。
例，

```
$ cat copy.txt 
wang yi
zhang san
li qi

# 想要把1-2行的小写转化为大写，正则表达式不可用
$ sed '1,2y/[a-z]/[A-Z]/' copy.txt 
wAng yi
ZhAng sAn
li qi

# 罗列全部字母，来替换
$ sed '1,2y/abcdefghijklmnopqrstuvwxyz/ABCDEFGHIJKLMNOPQRSTUVWXYZ/' copy.txt 
WANG YI
ZHANG SAN
li qi
```