const { override, fixBabelImports } = require('customize-cra');
module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
    }),
);

//安装 react-app-rewired
//安装 babel-plugin-import"
//安装 customize-cra
//关于 antd 样式按需加载。 阿里的文档写漏了，还需要修改package.json文件中的启动脚本  "start": "react-app-rewired start"

//eject后 react-app-rewired start 启动报错的问题，webpack版本冲突了
//解决办法，删除webpack版本依赖，删除package-lock，删除node-modules.重新npm install