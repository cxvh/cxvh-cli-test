#!/usr/bin/env node
/**
 * 如果让 Node 支持 ES Module
 * 模块化
 * CMD/AMD/require.js
 */

/**
 * CommonJS
 * 加载：require()
 * 输出：module.exports / exports.x
 */

/**
 * ES Module
 * 加载：import
 * 输出：export default / export function / const
 */

// require('./core')

// require('../dist/core')
// require('./process/index')
// ----------------------------------------------
// require('./inquirer/index')
// ----------------------------------------------

// (async function(){
//   var Spinner = require('cli-spinner').Spinner;
 
//   var spinner = new Spinner('processing.. %s');
//   spinner.setSpinnerString('|/-\\');
//   spinner.start();
//   await new Promise(resolve=>setTimeout(resolve,3000))
//   spinner.stop(true);
// })()

// ----------------------------------------------
// require('./inquirer/readline.demo')
// require('./inquirer/stepread')
// require('./inquirer/ansi')
// require('./inquirer/rxjs.demo')
require('./inquirer/list')
console.log(123)