const paths = require('./paths')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const publicPath = paths.servedPath
const shouldUseRelativeAssetPaths = publicPath === './'
const isDev = process.env.NODE_ENV === 'development'
const cpuLength = require('os').cpus().length

const getStyleLoaders = (cssOptions, preProcessor) => {
  let loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: Object.assign(
        {},
        shouldUseRelativeAssetPaths ? { publicPath: '../../' } : undefined
      )
    },
    {
      loader: require.resolve('css-loader'),
      options: cssOptions
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        ident: 'postcss',
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          require('postcss-preset-env')({
            autoprefixer: {
              flexbox: 'no-2009'
            },
            stage: 3
          })
        ]
      }
    }
  ]
  if (isDev) {
    loaders.unshift(require.resolve('css-hot-loader'))
  }
  if (preProcessor) {
    // 添加额外的loader
    loaders.push(require.resolve(preProcessor))
  }
  return loaders
}

const parallel = (loaders) => {
  if (!isDev && cpuLength > 1) {
    return [
      {
        loader: require.resolve('thread-loader')
      },
      ...loaders
    ]
  }
  return loaders
}

module.exports = {
  getStyleLoaders,
  parallel
}
