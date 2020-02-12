const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const service = require('../service');
const apiRouter = require('../api');
const socket = require('socket.io');
const http = require('http');
const ws = require('../service/ws');


const apiServer = new Koa();
const server = http.createServer(apiServer.callback());
const io = socket(server);

const PORT = 8081;

apiServer.use(bodyParser());

// 装载路由
const router = new Router();
router.use(apiRouter.routes());

// 链接mongodb数据库
service();

// ws服务
ws(io);

// web服务器
apiServer
    .use(router.routes())
    .use(router.allowedMethods());
    
// 导出web服务器
server.listen(PORT, () => console.log('apiServer is running'));
