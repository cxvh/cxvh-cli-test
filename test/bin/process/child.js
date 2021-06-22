console.log('child process');
console.log('child pid:',process.pid);
process.on('message',(msg)=>{
    console.log(msg);
})
process.send('子进程正在向主进程发送消息！')