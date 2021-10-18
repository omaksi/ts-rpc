export interface GenericRPC {
  method: string
  params: any
  result: any
}

export type HelloWorldRPC = {
  method: 'hello'
  params: {
    world: string
  }
  result: {
    message: string
  }
}
