import React from 'react'
import ReactDOM from 'react-dom'
import type { HelloWorldRPC } from './types'

const HelloWorld = () => {
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  )
}

// const helloWorld: HelloWorldRPC = async () => {}

const domContainer = document.querySelector('#root')
ReactDOM.render(React.createElement(HelloWorld), domContainer)
