// 添加 less 解析规则
const lessRegex = /\.less$/
const lessModuleRegex = /\.module\.less$/

module.exports = {
  rules: [
    // Less 解析配置
    {
      test: lessRegex,
      exclude: lessModuleRegex,
      use: getStyleLoaders(
        {
          importLoaders: 2,
          sourceMap: isEnvProduction && shouldUseSourceMap,
        },
        'less-loader',
      ),
      sideEffects: true,
    },
    {
      test: lessModuleRegex,
      use: getStyleLoaders(
        {
          importLoaders: 2,
          sourceMap: isEnvProduction && shouldUseSourceMap,
          modules: true,
          getLocalIdent: getCSSModuleLocalIdent,
        },
        'less-loader',
      ),
    },
  ],
}
