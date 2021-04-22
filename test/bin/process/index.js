const cp=require('child_process');
const path=require('path')

// cp.exec('ls -al|grep node_modules',function(err,stdout,stderr){
//   console.log(err);
//   console.log(stdout);
//   console.log(stderr);
// })

// cp.execFile('ls',['-al'],function(err,stdout,stderr){ // 不支持直接写 shell
// path.resolve(__dirname,'test.sh')
// cp.execFile(path.resolve(__dirname,'test.shell'),['-al','-bl'],function(err,stdout,stderr){
cp.execFile(path.resolve(__dirname,'demo.shell').replace(/\\/g,'/'),function(err,stdout,stderr){
  console.log(err);
  console.log(stdout);
  console.log(stderr);
});
// ['-al'],