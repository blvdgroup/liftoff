import { createElement, ComponentType, isValidElement } from 'react'
import { renderToNodeStream } from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'
import { Readable } from 'stream'
import MultiStream from 'multistream'

// TODO: add typings for this module
import signale from 'signale'

const logger = signale.scope('SSR')

export default (path: string) => {
  const Comp = require(`../client/pages/${path}`).default as ComponentType<any>
  if (!isValidElement(createElement(Comp))) {
    throw new Error('Tried to import an element, but it wasn\'t valid React - check your components.')
  }

  const wrappedElem = createElement(Comp)

  logger.time(`Render ${path} time`)
  logger.debug('Creating ServerStyleSheet')
  const sheet = new ServerStyleSheet()
  logger.debug('Collecting styles from element')
  const jsx = sheet.collectStyles(wrappedElem)
  logger.debug('Interleaving node stream with styles')
  const baseStream = sheet.interleaveWithNodeStream(renderToNodeStream(jsx))

  logger.debug('Creating header and footer streams')
  const header = '<html><head><title>liftoff</title></head><body><div id="root">' // TODO: allow header customization
  const midder = '</div>'
  const footer = '</body></html>'

  const headerStream = new Readable()
  headerStream.push(header)
  headerStream.push(null)

  const midderStream = new Readable()
  midderStream.push(midder)
  midderStream.push(null)

  // TODO - here we'll insert the first webpack chunks to import, between mid
  // and footer

  const footerStream = new Readable()
  footerStream.push(footer)
  footerStream.push(null)

  logger.info(`Created render stream of ${path}`)
  logger.timeEnd(`Render ${path} time`)
  return MultiStream([headerStream, baseStream, midderStream, footerStream])
}
