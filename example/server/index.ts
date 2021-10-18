import * as express from 'express'
import cors from 'cors'
import { RpcHandlerMiddleware } from '../../lib/lib'
import type { HelloWorldRPC } from '../types'
import type { Handle } from '../../lib/lib'

const app = express()
app.use(cors())
app.use(express.json())

const HelloWorldHandler: Handle<HelloWorldRPC> = (params) => {
  return { message: `Hello ${params.world}` }
}

const rpcHandlerMiddleware = RpcHandlerMiddleware({
  hello: HelloWorldHandler,
})

app.post('/', rpcHandlerMiddleware)

app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:${3000}`)
})
