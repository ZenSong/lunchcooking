// const path = require('path');
// module.exports = { 
//   // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
//   productionSourceMap: false, 
//   chainWebpack: (config)=>{
//     config.resolve.alias
//       .set('@$', path.join(__dirname,'src'))
//       .set('assets', path.join(__dirname,'src/assets')) 
//       .set('store', path.join(__dirname,'src/store'))
//   },
// } 
 


module.exports = { 
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
  productionSourceMap: false, 
  configureWebpack : {
    resolve : {
      alias: {
        "assets" : "@/assets",
        "network" : "@/network",
        "store" : "@/store",
        "ADCode" : "@/ADCode",
        "components" : "@/components",
      }
    }
  } 
} 

