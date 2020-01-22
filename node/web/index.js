const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const service = require('../service');
const apiRouter = require('../api');
const socket = require('socket.io');
const http = require('http');
const path = require('path');
const ws = require('../service/ws');
const static = require('koa-static');

const home = static(path.join(__dirname, '../build'));

const apiServer = new Koa();
const server = http.createServer(apiServer.callback());
const io = socket(server);

const PORT = 80;

apiServer.use(home);
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
    
    // 启动web服务器
server.listen(PORT, () => console.log('apiServer is running'));
