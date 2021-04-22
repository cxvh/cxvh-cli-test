const commander=require('commander')
const pkg=require('../package.json')
// 获取 commander 的单例，也可手动实例化一个 Command
// const {program}=commander;

// 实例化一个 Command 示例
const program=new commander.Command();

program
  .name(Object.keys(pkg.bin)[0])
  .usage('使用建议：<command> [options]')
  .version(pkg.version)
  .option('-d,--debug','是否开启调试模式',false)
  .option('-e,--envName <envName>','获取环境变量名称')
  // .parse(process.argv); // 参数解析放在最后

// command 注册命令
// cxvh-cli-test clone <此处尖括号为必填> [此处方括号为选填]
const clone=program.command('clone <source> <destination>')
clone
  .description('clone a repository')
  .option('-f,--force','是否强制拷贝')
  .action((source,distination,cmdOb)=>{
    console.log('do clone',source,distination,cmdOb.force);
  })

// addCommand 注册命令
const service=new commander.Command('service');
service
  .command('start [port]')
  .description('start service at some port')
  .action((port)=>{
    console.log('do service start',port);
  })
service
  .command('stop')
  .description('stop service')
  .action(()=>{
    console.log('stop service');
  })
program.addCommand(service)

// cxvh-cli-test install -v ==> npm -v （此方法不兼容 win，mac 测试可以）
/*
program
  .command('install [name]','install package',{
    // executableFile:'cxvh-cli'
    executableFile:'npm',
    isDefault: true, // 设置为默认
    hidden: true // 不在帮助命令展示
  })
  .alias('i')
*/

// 强制用户输入参数，和 Yargs.demandComand 类似
/*
program
  .arguments('<cmd> [options]')
  .description('test command',{
    cmd:'command to run',
    options:'option for command'
  })
  .action(function(cmd,options){
    console.log(cmd,options);
  })
*/

// 高级定制1：自定义 help 信息
program.helpInformation=function(){
  return '你的帮助信息'
}
program.on('---help',function(){
  console.log('你的帮助信息');
})

// 高级定制2：实现 debug 模式
program.on('option:debug',function(){
  if(program.debug){
    process.env.LOG_LEVEL="verbose"
  }
  console.log('debug',process.env.LOG_LEVEL);
})

// 高级定制3：对未知命令监听
program.on('command:*',function(obj){
  // console.log( obj)
  console.error('未知的命令：',obj[0]);
  const availableCommands=program.commands.map(cmd=>cmd.name());
  console.log('可用命令：'+availableCommands.join());
})


// 放在所有命令最后
program
  .parse(process.argv); // 参数解析放在最后
/*
// cxvh-cli-test -e a
console.log(program.opts());
*/