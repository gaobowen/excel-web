const { override, fixBabelImports } = require('customize-cra');
module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
    }),
);

//eject后 react-app-rewired start 启动报错的问题，webpack版本冲突了
//解决办法，删除webpack版本依赖，删除package-lock，删除node-modules.重新npm install