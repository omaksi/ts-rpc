// import type { HelloWorldRPC } from './types'

interface GenericRPCHandler<T extends GenericRPCHandlerFunction> {
  (name: T['method'], params: T['params']): T['result']
}

interface GenericRPCHandlerFunction {
  method: string
  params: Object
  result: Object
}

interface GenericRPC {
  method: string
  params: any
  result: any
}

type HelloWorldRPC = {
  method: 'hello'
  params: {
    world: string
  }
  result: {
    message: string
  }
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

const Call = async <T extends GenericRPC>(
  method: T['method'],
  params: T['params']
): Promise<T['result']> => {
  try {
    const response = await fetch(`http://localhost:3000/rpc/${method}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })
    const json = await response.json()
    return json
  } catch (error) {
    console.error(error)
  }
}

const helloWorldResult = Call<HelloWorldRPC>('hello', { world: 'Neptune' })

const HelloWorldHandler: GenericRPCHandler<HelloWorldRPC> = (method, params) => {
  return { message: `Hello ${params.world}` }
}

const http = require('http')

const RPCListener = async (req, res) => {
  const body = await req.body()
  const json = await body.json()

  if (json.method === 'hello') {
    const result = HelloWorldHandler(json.method, json.params)
    res.statusCode = 200
    res.send(result)
  } else {
    res.statusCode = 404
    res.send({ error: { code: -32601, message: 'Method not found' } })
  }
}

// const requestListener = function (req, res) {
//   res.writeHead(200)
//   res.end('Hello, World!')
// }

const server = http.createServer(RPCListener)
server.listen(8080)
