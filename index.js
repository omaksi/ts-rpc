(() => {
  // lib/lib.ts
  var RpcHandlerMiddleware = (handlers) => (req, res) => {
    console.log("RPCMiddleware");
    const body = req.body;
    if (body.method in handlers) {
      const result = handlers[body.method](body.method, body.params);
      console.log("result", result);
      res.statusCode = 200;
      res.json(result);
    } else {
      res.statusCode = 404;
      res.json({ error: { code: -32601, message: "Method not found" } });
    }
  };
  var Call = async (method, params) => {
    try {
      const response = await fetch(config.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ jsonrpc: config.jsonRpcHeader || void 0, method, params })
      });
      const json = await response.json();
      return json;
    } catch (error) {
      console.error(error);
    }
  };
  var config = {
    url: `http://localhost:1000/`,
    jsonRpcHeader: "2.0"
  };
  var RPCConfig = async (newConfig) => {
    Object.assign(config, newConfig);
  };
})();
