// 本文件目的是以React jsx 为模版替换掉html-webpack-plugin以及传统模版引擎, 统一ssr/csr都使用React组件来作为页面的骨架和内容部分
import webpack from 'webpack'
import { resolve } from 'path'
import { webpackWithPromise } from './util'
import { Argv } from './interface/argv'

const WebpackDevServer = require('webpack-dev-server')
const ora = require('ora')('正在构建')
const cwd = process.cwd()
const baseDir = process.env.BASE_DIR || '.'
const runtime = process.env.RUNTIME
const renderLayout = runtime === 'serverless' ? require('./renderLayoutForFass').default : require('./renderLayout').default
const clientConfig = require(resolve(cwd, baseDir, './build/webpack.config.client'))

process.on && process.on('message', async data => {
  if (data.msg === 'start dev') {
    await dev()
  }
})

const dev = async (argv?: Argv) => {
  const PORT = (argv && argv.PORT) || 8000
  const compiler = webpack(clientConfig)
  const server = new WebpackDevServer(compiler, {
    quiet: true,
    disableHostCheck: true,
    publicPath: clientConfig.output.publicPath || '/',
    hotOnly: true,
    host: '0.0.0.0',
    sockPort: PORT,
    contentBase: cwd + '/dist',
    hot: true,
    port: PORT,
    clientLogLevel: 'warning',
    headers: {
      'access-control-allow-origin': '*'
    },
    proxy: {
      '/api': 'http://localhost:7001'
    },
    before (app: any) {
      app.get('/', async (req: any, res: any) => {
        res.write('<!DOCTYPE html>')
        const stream = await renderLayout()
        stream.pipe(res, { end: false })
        stream.on('end', () => {
          res.end()
        })
      })
    },
    after (app: any) {
      app.get(/^\//, async (req: any, res: any) => {
        res.write('<!DOCTYPE html>')
        const stream = await renderLayout()
        stream.pipe(res, { end: false })
        stream.on('end', () => {
          res.end()
        })
      })
    }
  })
  server.listen(PORT, '0.0.0.0', () => {
    console.log(`Starting server on http://localhost:${PORT}`)
    process.send && process.send({ msg: 'start dev finish' })
  })
}

const build = async () => {
  ora.start()
  const stats: any = await webpackWithPromise(clientConfig)
  console.log(stats.toString({
    assets: true,
    colors: true,
    hash: true,
    timings: true,
    version: true,
    warnings: false
  }))
  ora.succeed()
}

module.exports = {
  dev,
  build
}
