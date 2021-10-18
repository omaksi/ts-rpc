import type { HelloWorldRPC } from './types'

interface Handle<T extends GenericRPCHandlerFunction> {
  (params: T['params'], method: T['method']): T['result']
}

interface GenericRPCHandlerFunction {
  method: string
  params: Object
  result: Object
}

type RPCResponse<R> = {
  id: number
} & ({ result: R } | { error: RPCError })

interface RPCError {
  code: number
  message: string
  data?: Object
}

// interface GenericRPCCall<T extends GenericRPC> {
//   (T['method'], T['params']): Promise<T['result']>
// }

// type Call<T extends GenericRPC> = (method: T['method'], params: T['params']) => Promise<T['result']>

// const CallHelloWorld: Call<HelloWorldRPC> = async (method, params) => {
//   return { message: `Hello, ${params.world}!` }
// }

const HelloWorldHandler: Handle<HelloWorldRPC> = (params) => {
  return { message: `Hello ${params.world}` }
}

const RPCHandlers: { [key: string]: Handle<any> } = {
  hello: HelloWorldHandler,
}

import * as express from 'express'
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())

// const addRPCHandler = (method: string, handler: GenericRPCHandler<any>) => {
//   RPCHandlers[method] = handler
// }

const RPCListener = async (req: express.Request, res: express.Response) => {
  console.log('RPCListener')
  const body = req.body

  if (body.method in RPCHandlers) {
    // const result = HelloWorldHandler(body.method, body.params)
    const result = RPCHandlers[body.method](body.method, body.params)
    console.log('result', result)
    res.statusCode = 200
    res.json(result)
  } else {
    res.statusCode = 404
    res.json({ error: { code: -32601, message: 'Method not found' } })
  }
}

app.post('/', RPCListener)

app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:${3000}`)
})
