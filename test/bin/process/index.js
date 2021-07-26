const cp = require('child_process');
const path = require('path')
console.log('node子进程调用方法\n', cp, '\n因为是异步，所以执行顺序有变化！')
// spawn：适合耗时任务（比如：npm install），需要不断打印日志
// exec/execFile：开销比较小的任务
/*******************/
// cp.exec('ls',{shell: 'C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe'},function (err,stdout,stderr){
//   console.log('err',err)
//   console.log('stdout',stdout)
//   console.log('stderr',stderr)
// })
/*******************/
// cp.execFile('D:\\nodejs\\node.exe',['--version'],function (err,stdout,stderr){// netstat -ano|findstr 90
//   console.log('err',err)
//   console.log('stdout',stdout)
//   console.log('stderr',stderr)
// })
// cp.execFile(path.resolve(__dirname,'test.sh'),{shell: 'C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe'},function (err,stdout,stderr){// netstat -ano|findstr 90 C:\Windows\System32\cmd.exe
//   console.log('err',err)
//   console.log('stdout',stdout)
//   console.log('stderr',stderr)
// })
/*******************/
// const child = cp.spawn('git',["clone","git@gitee.com:codeba/node-nvm.git","nodenvm"+Date.now()], {
//     shell:'C:\\Windows\\System32\\cmd.exe',
//     cwd: 'E:\\learn\\cxvh-cli-test\\cache'
// })
// const child = cp.spawn('cnpm',["install"], {
//     // shell: 'C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe',
//     shell:'C:\\Windows\\System32\\cmd.exe',
//     cwd: 'E:\\learn\\cxvh-cli-test\\cache\\node-nvm'
// })
// console.log(child.pid, process.pid)
// child.stdout.on('data', function (chunk) {
//     console.log('stdout', chunk.toString())
// })
// child.stderr.on('data', function (chunk) {
//     console.log('stderr', chunk.toString())
// })
// cp.exec('git clone git@gitee.com:codeba/node-nvm.git nodenvm' + Date.now(), {
//     cwd: 'E:\\learn\\cxvh-cli-test\\cache'
// }, function (err, stdout, stderr) {
//     console.log('err', err)
//     console.log('stdout', stdout)
//     console.log('stderr', stderr)
// })
// const child = cp.spawn('cnpm',["install","--force"], {
//     shell:'C:\\Windows\\System32\\cmd.exe',
//     cwd: 'E:\\learn\\cxvh-cli-test\\cache\\node-nvm',
//     stdio: 'inherit'
// })
const child = cp.spawn('node',["-e","console.log('打印当前时间戳',Date.now())"], {
    shell:'C:\\Windows\\System32\\cmd.exe',
    stdio: 'inherit'
})

/*******************/
// const child=cp.fork(path.resolve(__dirname,'child.js'));
// child.send('向子进程发送消息，子进程接收到会打印出来！',()=>{
//     console.log('向子进程发送消息成功！')
//     // console.log('发送完消息执行的回调，在回调里面结束会话~！')
//     // child.disconnect();
// })
// child.on('message',(msg)=>{
//     console.log('监听子进程向主进程发送的消息：',msg)
//     console.log('在子进程给主进程发完消息后，在回调里面结束会话~！')
//     child.disconnect();
// })
// console.log('main pid:',process.pid);
/*******************/
// const ret1=cp.execSync('git clone git@gitee.com:codeba/node-nvm.git nodenvm' + Date.now(),{
//     cwd: 'E:\\learn\\cxvh-cli-test\\cache'
// })
// console.log('ret1',ret1)
// const ret2=cp.execFileSync('git',['clone','git@gitee.com:codeba/node-nvm.git','nodenvm' + Date.now()],{
//     cwd: 'E:\\learn\\cxvh-cli-test\\cache'
// })
// console.log('ret2',ret2)
// const ret3=cp.spawnSync('git',['clone','git@gitee.com:codeba/node-nvm.git','nodenvm' + Date.now()],{
//     cwd: 'E:\\learn\\cxvh-cli-test\\cache'
// })
// console.log('ret3',ret3)
/*******************/