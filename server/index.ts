import Koa from 'koa'

import ssr from './ssr'

const app = new Koa()

app.use(ctx => {
  ctx.body = ssr('index')
})

app.listen(80)
