import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import type { GenericRPC, HelloWorldRPC } from './types'

const Call = async <T extends GenericRPC>(
  method: T['method'],
  params: T['params']
): Promise<T['result']> => {
  try {
    const response = await fetch(`http://localhost:3000/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ jsonrpc: '2.0', method, params }),
    })
    const json = await response.json()
    return json
  } catch (error) {
    console.error(error)
  }
}

const HelloWorld = () => {
  const [hello, setHello] = useState('')

  useEffect(() => {
    const fetchHelloWorld = async () => {
      const helloWorldResult = await Call<HelloWorldRPC>('hello', { world: 'Neptune' })
      setHello(helloWorldResult.message)
    }
    fetchHelloWorld()
  }, [])

  return (
    <div>
      <h1>{hello}</h1>
    </div>
  )
}

// const helloWorld: HelloWorldRPC = async () => {}

const domContainer = document.querySelector('#root')
ReactDOM.render(React.createElement(HelloWorld), domContainer)
