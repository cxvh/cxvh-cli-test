const path=require('path');
module.exports={
  entry:"./bin/core.js",
  output:{
    path:path.join(__dirname,'/dist'),
    filename:'core.js'
  },
  mode:"development", // production
  target:"node", // 默认是 浏览器的js；改成node才支持path
  module:{
    rules:[{
      test:/\.js$/,
      exclude:/(node_modules|dist)/,
      use:{
        loader:"babel-loader",
        options:{
          presets:['@babel/preset-env'],
          plugins:[["@babel/plugin-transform-runtime",{"corejs":3,"regenerator":true,"useESModules":true,"helpers":true}]]
        }
      }
    }]
  }
}