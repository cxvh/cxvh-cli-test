### 原生脚手架发布示例
- 创建文件并发布上去：`npm init`------>`npm publish`
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
```
理解`npm link`
- `npm link cxvh-cli-test-lib`将当前项目中`node_modules`下指定的库文件连接到`node`全局`node_modules`下的库文件
- `npm link`将当前项目链接到`node`全局`node_modules`中作为一个库文件，并解析`bin`配置创建可执行文件

理解`npm unlink`
- `npm unlink`将当前项目从`node`全局`node_modules`中移除
- `npm unlink cxvh-cli-test-lib`将当前项目中的库文件依赖移除