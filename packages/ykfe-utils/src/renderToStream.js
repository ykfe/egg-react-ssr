'use strict'

const renderToStream = async (ctx, config) => {
  const baseDir = config.baseDir || process.cwd()
  const isLocal = config.env === 'local'
  const serverJs = config.serverJs
  const runtime = config.runtime

  if (config.type !== 'ssr') {
    const renderLayout = require('yk-cli/bin/renderLayout').default
    const str = await renderLayout()
    return str
  }

  if (!global.renderToNodeStream) {
    if (runtime === 'serverless') {
      // 针对serverless runtime 将第三方模块打包进来不需要特殊处理
      global.renderToNodeStream = require('react-dom/server').renderToNodeStream
    } else {
      // for this issue https://github.com/ykfe/egg-react-ssr/issues/4
      global.renderToNodeStream = require(baseDir + '/node_modules/react-dom/server').renderToNodeStream
    }
  }

  if (isLocal) {
    // 本地开发环境下每次刷新的时候清空require服务端文件的缓存，保证服务端与客户端渲染结果一致
    delete require.cache[serverJs]
  }

  if (!global.serverStream || isLocal) {
    if (runtime === 'serverless') {
      global.serverStream = typeof serverJs === 'string' ? require('../../../web/' + serverJs).default : serverJs
    } else {
      global.serverStream = typeof serverJs === 'string' ? require(serverJs).default : serverJs
    }
  }

  const serverRes = await global.serverStream(ctx)
  const stream = global.renderToNodeStream(serverRes)
  return stream
}

export default renderToStream
