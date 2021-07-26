const readlineDemo=require('readline')
const rl=readlineDemo.createInterface({
  input:process.stdin,
  output:process.stdout
})
rl.question('your name: ',(answer)=>{
  console.log('your name: '+answer)
  rl.close()
})
