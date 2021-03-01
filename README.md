### 原生脚手架发布示例
- 创建文件并发布上去：`npm init`------>`npm publish`（每次提交的时候记得改版本号）
- 测试：`npm i -g cxvh-cli-test`（本地开发可直接`npm link`全局安装）------>`cxvh-cli-test`------>打印出了`welcome cxvh-cli-test`
- 查看路径：`which cxvh-cli-test`
- `ls -al /c/...`接`which`的文件地址查看详情

### 关联包
- 进`test`文件夹`npm link`
- 再进`lib`文件夹`npm link`
- 再进`test`文件夹`npm link cxvh-cli-test-lib`就可以使用`lib`包了
- 然后就可以使用`cxvh-cli-test`命令了

需要手动添加
```json
"dependencies": {
  "cxvh-cli-test-lib": "^1.0.0"
}
```

### 本地link标准流程
链接本地脚手架
```sh
cd cxvh-cli-test
npm link
```
链接本地库文件
```sh
cd cxvh-cli-test-lib
npm link
cd cxvh-cli-test
npm link cxvh-cli-test-lib
```
取消链接本地库文件
```sh
cd cxvh-cli-test-lib
npm unlink
cd cxvh-cli-test
npm unlink cxvh-cli-test-lib
# 如果link不存在
rm -rf node_modules
npm link
```
理解`npm link`
- `npm link cxvh-cli-test-lib`将当前项目中`node_modules`下指定的库文件连接到`node`全局`node_modules`下的库文件
- `npm link`将当前项目链接到`node`全局`node_modules`中作为一个库文件，并解析`bin`配置创建可执行文件

理解`npm unlink`
- `npm unlink`将当前项目从`node`全局`node_modules`中移除
- `npm unlink cxvh-cli-test-lib`将当前项目中的库文件依赖移除


### yargs是如何实现脚手架的？
- 脚手架构成
  - bin(主命令)：在`package.json`配置，本地安装用`npm link` 
  - command：命令
  - options：参数（boolean、string、number）
  - 文件顶部增加`#!/usr/bin/env node`（告诉操作系统，要在环境变量中查询到`node`命令，通过`node`命令来执行文件）
- 脚手架初始化流程
  - 构建函数：`Yargs()`
  - 常用方法（增强脚手架功能）：
    - `Yargs.usage`用法说明
    - `Yargs.recommendCommands`输入错误会提示相似命令
    - `Yargs.demandCommand`限制命令数量
    - `Yargs.fail`错误处理
    - `Yargs.strict`严格模式
    - `Yargs.alias`别名
    - `Yargs.wrap`宽度
    - `Yargs.epilogue`页脚提示
    - `Yargs.options`选项(多个选项传数组)
    - `Yargs.options`选项(单个选项，传JSON)
    - `Yargs.group`分组
- 脚手架参数解析方法（识别命令）
  - `hideBin(process.argv)`/`Yargs.argv`
  - `Yargs.parse(argv,options)`
- 命令注册方法
  - `Yargs.commannd(command,describe,builder,handler)`
  - `Yargs.commannd({command,describe,builder,handler})`

### Nodejs模块路径解析流程的理解
- `Node.js`项目模块路径解析是通过`require.resolve`方法来实现的
- `require.resolve`就是通过`Module._resolveFileName`方法实现的
- `require.resolve`实现原理：
  - `Module._resoolveFileName`方法核心流程有`3`点：
    - 判断是否为内置模块
    - 通过`Module._resolveLookupPaths`方法生成`node_modules`可能存在的路径
    - 通过`Module._findPath`查询模块的真实路径
  - `Module._findPath`核心流程有`4`点：
    - 查询缓存（将`request`和`paths`组成文件路径`basePath`）
    - 如果`basePath`存在则调用`fs.realPathSync`获取文件真实路径
    - 将文件真实路径缓存到`Module._pathCache`（`key`就是前面生成的`cacheKey`）
  - `fs.realPathSync`核心流程有`3`点：
    - 查询缓存（缓存的`key`为`p`，即`Module.findPath`中生成的文件路径）
    - 从左往右遍历路径字符串，查询到`/`时，拆分路径，判断该路径是否为软连接，如果是软连接则查询真实链接，并生成新路径`p`，然后继续往后遍历，这里有`1`个细节需要特别注意：
      - 遍历过程中生成的子路径`base`会缓存在`knownHard`和`cache`中，避免重复查询
    - 遍历完成得到模块对应的真实路径，此时会将原始路径`original`作为`key`，真实路径作为`value`，保存到缓存中。
- `require.resolve.paths`等价于`Module.resolveLookupPaths`，该方法用于获取所有`node_modules`可能存在的路径
- `require.resolve.paths`实现原理：
  - 如果路径为`/`（根目录）,直接返回`['/node_modules']`
  - 否则，将路径字符串从后往前遍历，查询到`/`时，拆分路径，在后面加上`node_modules`，并传入一个`paths`数组，直至查询不到`/`后返回`path`数组