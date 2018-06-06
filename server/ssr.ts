import { createElement, ComponentType, isValidElement } from 'react'
import { renderToString, renderToNodeStream } from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'
import { Readable } from 'stream'
import MultiStream from 'multistream'

export default (path: string) => {
  const Comp = (require(`../client/${path}`) as ComponentType<any>)
  console.log(renderToString(createElement(Comp)))
  if (!isValidElement(createElement(Comp))) {
    throw new Error('Tried to import an element, but it wasn\'t valid React - check your components.')
  }

  console.log('Creating sheet')
  const sheet = new ServerStyleSheet()
  console.log('Collecting styles')
  const jsx = sheet.collectStyles(createElement(Comp))
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
