/*
参考文档：https://handwiki.org/wiki/ANSI_escape_code
终端不同、显示效果不一样
cmd下划线不显示，可以使用git bash
 */
//字体颜色蓝色，从这开始的字体颜色都是蓝色(34)
console.log('\x1B[34m%s','your name:')
//背景颜色红色，从这开始的背景颜色都是红色(41)
console.log('\x1B[41m%s','your name:')
//背景颜色红色，下一行终止背景颜色为红色(\x1B[0m)
console.log('\x1B[41m%s\x1B[0m','your name:')
//字体白色，下划线、下一行终止这些样式
console.log('\x1B[97m\x1B[4m%s\x1B[0m','your name:')
//光标向下移动两行打印
console.log('\x1B[2B%s','your name:')
//光标向右移动两格打印
console.log('\x1B[2G%s','your name123:')




