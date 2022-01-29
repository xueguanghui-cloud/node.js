// 在编写调式 node.js 项目的时候，如果修改了项目的代码，则需要频繁的手动 close 掉，然后再重新启动，
// 非常繁琐，现在我们可以使用 nodemon 这个工具，它能够监听项目文件的变动，当代码被修改后，nodemon会自动
// 帮我们重启项目，极大的方便了开发和调式。

// 安装命令： npm install -g nodemon

// 使用方法： nodemon 项目名
console.log('nodemon 这个工具真的好方便!, 嘎嘎');