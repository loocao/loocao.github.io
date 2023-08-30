# vimrc配置

文件:`~/.vimrc`

```vim
" 不与 Vi 兼容（采用 Vim 自己的操作命令）。
set nocompatible
" 打开语法高亮。自动识别代码，使用多种颜色显示。
" syntax on
" 在底部显示，当前处于命令模式还是插入模式。
set showmode
" 支持使用鼠标。
"set mouse=a
" 使用 utf-8 编码。
set fileencodings=utf-8,ucs-bom,gb18030,gbk,gb2312,cp936
set termencoding=utf-8
set encoding=utf-8
" 启用256色。
set t_Co=256
" 按下回车键后，下一行的缩进会自动跟上一行的缩进保持一致。
set autoindent
" 按下 Tab 键时，Vim 显示的空格数。
set tabstop=2
" 由于 Tab 键在不同的编辑器缩进不一致，该设置自动将 Tab 转为空格。
set expandtab
" Tab 转为多少个空格。
set softtabstop=2
" 显示行号
set number
" 是否显示状态栏。0 表示不显示，1 表示只在多窗口时显示，2 表示显示。
set laststatus=2
" 在状态栏显示光标的当前位置（位于哪一行哪一列）。
set  ruler
" 光标遇到圆括号、方括号、大括号时，自动高亮对应的另一个圆括号、方括号和大括号。
set showmatch
" 搜索时，高亮显示匹配结果。
set hlsearch
" 输入搜索模式时，每输入一个字符，就自动跳到第一个匹配的结果。
set incsearch
" 出错时，发出视觉提示，通常是屏幕闪烁。
set visualbell
" 命令模式下，底部操作指令按下 Tab 键自动补全。第一次按下 Tab，会显示所有匹配的操作指令的清单；第二次按下 Tab，会依次选择各个指令。
set wildmenu
set wildmode=longest:list,full
```