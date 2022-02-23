const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("dataApp.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);
const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log("Server is running");
});
