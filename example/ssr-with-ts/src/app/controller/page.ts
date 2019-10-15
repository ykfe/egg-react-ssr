import { controller, get, provide, inject, Context } from 'midway'
const renderToStream = require('ykfe-utils/lib/renderToStream')
const ssrConfig = require('../../../config/config.ssr')

@provide()
@controller('/')
export class Page {

  @inject()
  ctx: Context

  @get('/')
  @get('/news/:id')
  async index () {
    try {
      // Page为webpack打包的chunkName，项目默认的entry为Page
      this.ctx.type = 'text/html'
      this.ctx.status = 200
      Object.assign(this.ctx.app.config, ssrConfig)
      const stream = await renderToStream(this.ctx, this.ctx.app.config)
      this.ctx.body = stream
    } catch (error) {
      this.ctx.logger.error(`Page Controller renderToStream Error ${error}`)
    }
  }

}
