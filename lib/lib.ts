import type * as express from 'express'

export interface GenericRPC {
  method: string
  params: any
  result: any
}

export interface Handle<T extends GenericRPCHandlerFunction> {
  (params: T['params'], method: T['method']): T['result']
}

interface GenericRPCHandlerFunction {
  method: string
  params: Object
  result: Object
}

type Handlers = { [key: string]: Handle<any> }

type RPCResponse<R> = {
  id: number
} & ({ result: R } | { error: RPCError })

interface RPCError {
  code: number
  message: string
  data?: Object
}

export const RpcHandlerMiddleware =
  (handlers: Handlers) => (req: express.Request, res: express.Response) => {
    console.log('RPCMiddleware')
    const body = req.body

    if (body.method in handlers) {
      // const result = HelloWorldHandler(body.method, body.params)
      const result = handlers[body.method](body.method, body.params)
      console.log('result', result)
      res.statusCode = 200
      res.json(result)
    } else {
      res.statusCode = 404
      res.json({ error: { code: -32601, message: 'Method not found' } })
    }
  }

export const Call = async <T extends GenericRPC>(
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