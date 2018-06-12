import * as React from 'react'

import GraphHandler from './GraphHandler'
import ComponentHandler from './ComponentHandler'

interface WrapperProps {
  graph: GraphHandler,
  components: ComponentHandler,
  children: any // TODO
}

export default class Wrapper extends React.Component<WrapperProps> {
  public render () {
    // BIG TODO - this class will wrap with the router and everything, handle
    // unloaded pages in the spa, all that jazz

    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}
