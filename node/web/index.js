const koa2 = require('koa');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const service = require('../service');
const apiRouter = require('../api');

const apiServer = new koa2();

apiServer.use(bodyParser());

// 装载路由
const router = new Router();
router.use(apiRouter.routes());

// 链接mongodb数据库
service();

apiServer
    .use(router.routes())
    .use(router.allowedMethods())
    // 启动web服务器
    .listen(8080, () => console.log('apiServer is running'));