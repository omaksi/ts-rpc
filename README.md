# ts-rpc

ts-rpc is a simple RPC library written in TypeScript with support for sharing types between the client and server.

```
yarn add ts-rpc
```

## Usage

Configure RPC type:
```typescript
type HelloWorldRPC = {
  method: 'hello'
  params: {
    world: string
  }
  result: {
    message: string
  }
}
```

Server:
```typescript
const rpcHandlerMiddleware = RpcHandlerMiddleware({
  hello: Handle<HelloWorldRPC> = (params) => ({ 
    message: `Hello ${params.world}` 
  })},
})
```

Client:
```typescript
const result = await Call<HelloWorldRPC>('hello', { world: 'Neptune' })
console.log(result.message) // Hello Neptune
```


## Example
See examples directory for full example.

## License
MIT