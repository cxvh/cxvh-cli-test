#!/usr/bin/env node
const lib=require('cxvh-cli-test-lib')
console.log(lib.sum(123,3))
console.log('welcome cxvh-cli-test')

// 注册一个命令 cxvh-cli-test init
const argv=require('process').argv;
const command=argv[2];
// 截取数组
const options=argv.slice(3);
if(options.length>1){
  let [option,param]=options;
  option=option.replace('--','')
  if(command){
    if(lib[command]){
      lib[command]({option,param})
    }else{
      console.log('无效的命令！')
    }
  }else{
    log('请输入命令')
  }
}
// 实现参数解析 --version 和 init --name
if(command&&(command.startsWith('--')||command.startsWith('-'))){ // startsWith判断以--开头
  const glibalOption=command.replace(/--|-/g,"");
  if(glibalOption==="version"||glibalOption==="V"){
    console.log('v1.0.0')
  }
}

// yargs
const yargs=require('yargs/yargs');
// 解析参数
const {hideBin}=require('yargs/helpers')
const arg=hideBin(process.argv)
const cli=yargs(arg)
const dedent=require('dedent')
const pkg=require('../package.json')
const context={
  cxvhCliTestVersion:pkg.version
}
const argv2=process.argv.slice(2)
const cloneDeep=require('clone-deep')
cli
  // 用法
  .usage('命令格式：cxvh-cli-test [command] <options>')
  // 输入错误会提示相似命令
  .recommendCommands()
  // 限制命令数量
  .demandCommand(1,"最少输入一条正确的命令")
  // 错误处理
  .fail((err,msg)=>{
    console.log('错误提示：',err,msg)
  })
  // 严格模式
  .strict()
  // 别名
  .alias('h',"help")
  .alias('v',"version")
  // 显示宽度
  // .wrap(100)
  .wrap(cli.terminalWidth()) // 全屏宽度
  // 页脚提示，dedent定格显示
  .epilogue(dedent`
        这是使用 yargs 开发的
        `)
  // 加了后所有command都能访问到
  .options({
    debug:{
      type:"boolean",
      describe:"启动debugger模式",
      alias:"d"
    }
  })
  .option("registry",{
    type:"string",
    describe:"注册",
    alias:"r"
  })
  // 聚合分类
  .group(['debug'],'开发命令:')
  .group(['v','h'],'全局命令:')
  // 注册命令
  .command('init [name]','初始化一个项目',yargs=>{
    yargs
      .option('name',{
        type:"string",
        describe:"项目的名称",
        alias:"n"
      })
  },argv=>{
    console.log(argv)
  })
  .command({
    command:"list",
    aliases:['ll','ls','la'],
    describe:"列表packages",
    builder:(yargs)=>{
      console.log(yargs)
    },
    handler:(argv)=>{
      console.log(argv)
    }
  })
  .parse(argv2,context)
  // 默认支持 --help
  .argv;