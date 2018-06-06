import { ReactElement, isValidElement } from 'react'
import { renderToString, renderToNodeStream } from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'
import { Readable } from 'stream'
import MultiStream from 'multistream'

export default (path: string) => {
  const root = (require(`../client/${path}`) as ReactElement<any>)
  console.log(renderToString(root))
  if (!isValidElement(root)) {
    throw new Error('Tried to import an element, but it wasn\'t valid React - check your components.')
  }

  console.log('Creating sheet')
  const sheet = new ServerStyleSheet()
  console.log('Collecting styles')
  const jsx = sheet.collectStyles(root)
  console.log('Interleaving stream')
  const baseStream = sheet.interleaveWithNodeStream(renderToNodeStream(jsx))

  const header = '<html><head><title>liftoff</title></head><body>' // TODO: allow header customization
  const footer = '</body></html>'

  const headerStream = new Readable()
  headerStream.push(header)
  headerStream.push(null)

  const footerStream = new Readable()
  footerStream.push(footer)
  footerStream.push(null)

  return MultiStream([headerStream, baseStream, footerStream])
}
