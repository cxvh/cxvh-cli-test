import pathExists from 'path-exists'

export function exists(p){
  return pathExists.sync(p)
}

// module.exports=function(){
//   console.log('hello utils');
//   console.log('123');
// }