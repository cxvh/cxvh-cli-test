import path from "path"
// import utils from './utils'
import {exists} from './utils.mjs'

console.log(path.resolve('.'));
console.log(exists(path.resolve('.')));

// utils()
(async function(){
  await new Promise(resolve=> setTimeout(resolve,1000))
  console.log('ok');
})()