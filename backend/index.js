const jsonServer = require('json-server');
const cors = require('cors');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(cors());
server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use('/api', router);

server.listen(5000, () => {
  console.log('Servidor rodando em http://localhost:5000/api');
});
