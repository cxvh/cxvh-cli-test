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
if(command.startsWith('--')||command.startsWith('-')){
  const glibalOption=command.replace(/--|-/g,"");
  if(glibalOption==="version"||glibalOption==="V"){
    console.log('v1.0.0')
  }
}