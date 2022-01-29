// 安装指定版本的包
// npm install moment@2.24.0

/**
 *  包管理配置文件：
 *    dependencies节点：包在开发和项目上线阶段都会用到
 *    devDependencies节点：包只在开发阶段会用到，项目上线后不会用到（安装命令：npm install 包名 -D 或 --save-dev）
 */


// 导入需要的包
const moment = require('moment');

const dt = moment().format('YYYY-MM-DD HH:mm:ss');
console.log(dt);