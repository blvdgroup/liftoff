import Koa from 'koa'
import { sep } from 'path'

import ssr from './ssr'

const app = new Koa()

app.use(ctx => {
  let path = ctx.request.path.substring(1).replace('/', sep)
  if (path === '') path = 'index'
  ctx.body = ssr(path)
  ctx.type = 'text/html'
})

app.listen(80)
