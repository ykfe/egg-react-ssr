import { Context }from 'midway'
import { useCdn } from './useCdn'
import { Config }from './interface/config'
import { Global }from './interface/global'

declare const global: Global

const renderToStream = async (ctx: Context, config: Config) => {
  const { useCDN, serverJs, baseDir } = config
  const BASE_DIR = baseDir || process.cwd()
  const isLocal = process.env.NODE_ENV === 'development' || config.env === 'local' // 标志非正式环境
  let SEVER_JS = serverJs

  if (useCDN && typeof serverJs === 'string') {
    SEVER_JS = await useCdn(serverJs, isLocal)
  }

  if (isLocal && typeof SEVER_JS === 'string') {
    // 本地开发环境下每次刷新的时候清空require服务端文件的缓存，保证服务端与客户端渲染结果一致
    delete require.cache[SEVER_JS]
  }

  const csr = ctx.request?.query?.csr ? ctx.request.query.csr : false // 兼容express和koa的query获取

  if (config.type !== 'ssr' || csr) {
    const renderLayout = require('yk-cli/lib/renderLayout').default
    const str = await renderLayout(ctx, config)
    return str
  }

  if (!global.renderToNodeStream) {
    // for this issue https://github.com/ykfe/egg-react-ssr/issues/4
    global.renderToNodeStream = require(BASE_DIR + '/node_modules/react-dom/server').renderToNodeStream
  }
  const serverComponent = typeof SEVER_JS === 'string' ? await require(SEVER_JS).default(ctx) : SEVER_JS(ctx)
  const stream = global.renderToNodeStream(serverComponent)

  return stream
}

export default renderToStream
