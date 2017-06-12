# BASE

一个H5的婚礼贺卡邀请函，方便你我他幸福千万家. [线上地址](https://l-zhi.com/dist2/index.html)

## 开始

[体验地址](https://l-zhi.com/dist2/index.html)

基于ELF做的一个贺卡模板, 需要先安装 [ELF](https://github.com/o2team/elf)

```bash

# mac/linux
SASS_BINARY_SITE=https://npm.taobao.org/mirrors/node-sass/ PHANTOMJS_CDNURL=https://npm.taobao.org/mirrors/phantomjs/ npm install -g elf-cli --registry=https://registry.npm.taobao.org

# windows
npm install -g elf-cli --registry=https://registry.npm.taobao.org --SASS_BINARY_SITE=https://npm.taobao.org/mirrors/node-sass/ --PHANTOMJS_CDNURL=https://npm.taobao.org/mirrors/phantomjs/

# 安装ELF之后，clone 项目，安装依赖

clone https://github.com/l-zhi/marrycard.git

cd marrycard

npm install # 或者使用 yarn install

# 开发模式
elf start

# 构建
elf run build
```

## 其他

1. 开发脚手架依赖于ELF
2. 后端数据存储用的是[leancloud](https://leancloud.cn/)，可配置自己的数据存储地址 main.js 92行
