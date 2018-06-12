import { hydrate } from 'react-dom'
import * as React from 'react'

import ComponentHandler from './ComponentHandler'
import GraphHandler from './GraphHandler'
import Wrapper from './Wrapper'

// get page graph
const g = require('./graph.json') // TODO - will autogenerate graph.json on bld
const graph = new GraphHandler(g)

// get initial component
const comp = window.location.pathname.substr(1)
graph.setRoot(comp)

const handler = new ComponentHandler();

// define global fetcher
(window as any).fetchComponent = handler.import

const compScript = document.createElement('script')
compScript.src = graph.getRootScript()

handler.on(`import-${comp}`, (Component) => {
  hydrate(
    (
      <Wrapper graph={graph} components={handler}>
        <Component />
      </Wrapper>
    ),
    document.getElementById('root')
  )
})
