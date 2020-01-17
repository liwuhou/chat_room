const koa2 = require('koa');
const bodyParser = require('koa-bodyparser');
const path = require('path');

const {
    readFile,
    writeFile
} = require('../utils');


// 聊天记录文件路径
const MSG_FILE = path.resolve(__dirname, '../storage/chat_message_list.json')

// 获取聊天记录
const getMsgList = async () => {
    const data = await readFile(MSG_FILE);
    return JSON.parse(data);
}

const apiServer = new koa2();

apiServer.use(bodyParser());

apiServer.use(async (ctx) => {
    const {url, method} = ctx;

    if(method === 'GET'){
        // 请求参数
        const {query} = ctx;

        switch(url){
            case '/api/getMsgList':
                const msgList = await getMsgList();
                ctx.body = JSON.stringify({
                    status: 1,
                    data: {
                        msgList,
                        ownUserName: 'William',
                        chat_name: '摸鱼俱乐部'
                    }
                })
                break;
            default:
                ctx.body = '404';
        }
    }else if(method === 'POST'){
        const body = ctx.request.body;
        switch(url){
            case '/api/sendMsg':
                const msgList = await getMsgList();
                msgList.push({
                    ...body,
                    time: Date.now(),
                    id: Date.now()                    
                });
                writeFile(MSG_FILE, JSON.stringify(msgList)).catch(console.log);
                ctx.body = JSON.stringify({
                    status: 1,
                    data: {
                        msgList,
                    }
                })
                break;
        }
        
    }
})

apiServer.listen(8080, () => {
    console.log('apiServer is running');
})