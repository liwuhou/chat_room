const http = require('http');
const path = require('path');
// const queryString = require('querystring');
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


const apiServer = http.createServer(async (req, res) => {
    const {url, method} = req;

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    if(url === '/api/getMsgList'){
        res.writeHead(200, {'Content-Type': 'application/json'});
        const msgList = await getMsgList();
        res.end(JSON.stringify({
            status: 1,
            data: {
                msgList,
                ownUserName: 'William',
                chat_name: '摸鱼俱乐部'
            }
        }));
    }else if(url === '/api/sendMsg'){
        if(method === 'POST'){
            res.writeHead(200, {'Content-Type': 'application/json'});
            let body = [];
            req.on('data', data => {
                body.push(data);
            }).on('end', async () => {
                const message = Buffer.concat(body).toString();
                let msgList = await getMsgList();
                const messageObj = JSON.parse(message);
                msgList.push({
                    ...messageObj,
                    time: Date.now(),
                    id: Date.now()                    
                });
                writeFile(MSG_FILE, JSON.stringify(msgList)).catch(console.log);
                res.end(
                    JSON.stringify({
                        status: 1,
                        data: {
                            msgList,
                        }
                    })
                );
            })
        }
        res.end();

    }else{
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end('<h1>hello world!</h1>');
    }
})

apiServer.listen(8080, () => {
    console.log('apiServer is running')
})