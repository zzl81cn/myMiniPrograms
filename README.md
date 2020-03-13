# myMiniPrograms

## 公共模块、页面级别样式预处理编译
### 安装

1、请先全局安装 Gulp-cli（Gulp 4）

```
npm install gulp-cli -g
```

2、安装必要模块

```
npm i
```

3、启动开发

在终端中运行如下命令开启：

```
gulp
```

### 开发

接下来进入常规开发即可。开发过程中，**使用第三方编辑器（WebStorm、Sublime Text 等）编辑`assets\scss`目录下的文件**，保存修改后gulp 进程会实时编译到`src\style`目录相应的位置。而**微信web 开发者工具会自动编译刷新，此时仅充当预览功能**。


### struct
``` bash
.
├─assets
│  ├─images 存放在图片服务器或做OSS、CDN等处理
│  └─scss scss样式预处理，编译到“./src/style/commmon.wxss”,在app.wxss引入生效
├─src
│  ├─components 插件
│  │  ├─carNumber
│  │  └─stars
│  ├─data
│  ├─images 本地图片（注意文件大小）
│  │  └─common
│  ├─libs
│  ├─pages
│  │  ├─find
│  │  ├─index 首页
│  │  ├─user 个人
│  │  └─list
│  ├─style
│  ├─utils
│  ├─app.js
│  ├─app.json
│  ├─app.wxss
│  ├─app.js
│  ├─project.config.json
│  └─sitemap.json
├─gulpfile.js 自动化处理脚本
├─package.json
└─README.md
```
