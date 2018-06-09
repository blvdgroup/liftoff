import { createElement, ComponentType, isValidElement } from 'react'
import { renderToNodeStream } from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'
import { Readable } from 'stream'
import MultiStream from 'multistream'

type CustomLogger = 'remind' | 'santa'

const options: SignaleOptions<CustomLogger> = {
  stream: process.stdout,
  scope: 'custom',
  types: {
    remind: {
      badge: '**',
      color: 'yellow',
      label: 'reminder'
    },
    santa: {
      badge: '🎅',
      color: 'red',
      label: 'santa'
    }
  }
}

// TODO: add typings for this module
import signale, { Signale, SignaleOptions, DefaultMethods } from 'signale'

const logger = signale.scope('SSR')
const customLogger = new Signale<CustomLogger>(options).scope<CustomLogger>('custom')

export default (path: string) => {
  const Comp = require(`../client/${path}`).default as ComponentType<any>
  if (!isValidElement(createElement(Comp))) {
    throw new Error('Tried to import an element, but it wasn\'t valid React - check your components.')
  }

  // TODO: ignore this, just testing the signale declarations.
  // that being said, I give up trying to make the `CustomLogger` type extend the default command set.
  customLogger.remind('works')
  customLogger.santa('works')
  customLogger.debug('should still work')

  logger.time(`Render ${path}`)
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
