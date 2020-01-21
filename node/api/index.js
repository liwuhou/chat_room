const Router = require('koa-router');
const mongoose = require('mongoose');

const apiRouter = new Router({
    prefix: '/api'
});

// 登录接口
apiRouter.post('/login', async(ctx) => {
    // 取得model
    const User = mongoose.model('User');
    const {username, password} = ctx.request.body;
    const checkUser = await User.find({username});
    if(checkUser.length){ // 已注册的用户，验证密码
        const [ownUser] = checkUser;
        if(password === ownUser.password){ // 密码正确
            ctx.body = {
                status: 1,
                message: '登录成功',
                token: 'login'
            }
            ctx.cookies.set(
                'username', encodeURI(username), {
                    maxAge: 1000*60*60*24,
                    httpOnly: false,
                }
            )
            // 更新登录时间
            User.update({username, password}, {lastLoginAt: Date.now()})
        }else{
            ctx.body = {
                status: 2,
                message: '摸鱼口令错误！'
            }
        }
    }else{ // 注册用户
        let newUser = new User({username, password});
        await newUser.save().then(() => {
            ctx.cookies.set(
                'username', encodeURI(username), {
                    maxAge: 1000*60*60*24,
                    httpOnly: false,
                }
            )
            ctx.body = {
                status: 1,
                message: '注册成功',
                token: 'register'
            }
        })
    }
})

// 获取聊天信息接口
apiRouter.get('/getMsgList', async(ctx) => {
    const {chatName = '摸鱼俱乐部'} = ctx.query;
    const ChatData = mongoose.model('ChatData');
    const msgList = await ChatData.find({})
    ctx.body = {
        status: 1,
        message: '请求成功！',
        data: {
            msgList,
            chatName
        }
    }
})

// 发送聊天信息
apiRouter.post('/sendMsg', async(ctx) => {
    const ChatData = mongoose.model('ChatData');
    const {chatName, username, content} = ctx.request.body;
    const newMessage = new ChatData({username, content});
    await newMessage.save().then(() => {
        ctx.body = {
            status: 1,
            message: '发送成功！',
            data: newMessage
        }
    })
})

module.exports = apiRouter;