import Koa from 'koa'

import ssr from './ssr'

const app = new Koa()

app.use(ctx => {
  ctx.body = ssr('index')
  ctx.type = 'text/html'
})

app.listen(80)
