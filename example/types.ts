export type HelloWorldRPC = {
  method: 'hello'
  params: {
    world: string
  }
  result: {
    message: string
  }
}
