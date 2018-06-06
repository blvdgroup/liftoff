import * as React from 'react'

interface IndexProps {
  time: string
}

export default ({ time }: IndexProps) => (
  <div>
    <h1>Hello world!</h1>
    <h2>The time is {time}.</h2>
  </div>
)
