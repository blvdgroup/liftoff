import { createElement, ComponentType, isValidElement } from 'react'
import { renderToNodeStream } from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'
import { Readable } from 'stream'
import MultiStream from 'multistream'
import universal from 'react-universal-component'

// TODO: add typings for this module
import signale from 'signale'

const logger = signale.scope('SSR')

export default (path: string) => {
  // const Comp = require(`../client/${path}`).default as ComponentType<any>
  // if (!isValidElement(createElement(Comp))) {
  //   throw new Error('Tried to import an element, but it wasn\'t valid React - check your components.')
  // }

  logger.time(`Render ${path}`)

  // wrapping component with universal
  const Comp = universal(() => import('../client/index'), { // todo: dynamic imports, bla bla
    onError: () => { throw new Error('Tried to import an element, but universal encountered an error.') }
  })

  // styled-components styling
  logger.debug('Creating ServerStyleSheet')
  const sheet = new ServerStyleSheet()
  logger.debug('Collecting styles from element')
  const jsx = sheet.collectStyles(createElement(Comp))
  logger.debug('Interleaving node stream with styles')
  const baseStream = sheet.interleaveWithNodeStream(renderToNodeStream(jsx))
  logger.timeEnd(`Render ${path}`)

  logger.debug('Creating header and footer streams')
  const header = '<html><head><title>liftoff</title></head><body>' // TODO: allow header customization
  const footer = '</body></html>'

  const headerStream = new Readable()
  headerStream.push(header)
  headerStream.push(null)

  const footerStream = new Readable()
  footerStream.push(footer)
  footerStream.push(null)

  logger.info(`Created render stream of ${path}`)
  return MultiStream([headerStream, baseStream, footerStream])
}
