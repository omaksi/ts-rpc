import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import type { HelloWorldRPC } from '../types'
import { Call } from '../../lib/lib'

const HelloWorld = () => {
  const [message, setMessage] = useState('Loading...')

  useEffect(() => {
    Call<HelloWorldRPC>('hello', { world: 'Neptune' }).then((res) => {
      setMessage(res.message)
    })
  }, [])

  return (
    <div>
      <h1>{message}</h1>
    </div>
  )
}

const domContainer = document.querySelector('#root')
ReactDOM.render(React.createElement(HelloWorld), domContainer)
