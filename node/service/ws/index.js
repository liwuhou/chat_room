const mongoose = require('mongoose');
const {getRandomId} = require('../../utils');

module.exports = (io) => {
    // 用户map
    const socketMap = {};
    // 用户数
    let memberCount = 0;
    // 全局广播（包括自己）
    const broadcast = (event, data) => {
        Object.values(socketMap).forEach(socket => {
            socket.emit(event, data);
        })
    }
    
    // 建立连接
    io.on('connection', (socket) => {
        
        socket.on('init', (username) => {
            memberCount++;
            socketMap[username] = socket;
            socket.username = username;

            // 全场广播
            broadcast('notice', {
                memberCount,
                message: {
                    event: 'notice',
                    _id: getRandomId(), 
                    content: `${username}帅气地进入了聊天室`, 
                }
            })
        })

        socket.on('chat', async (data) => {
            const ChatData = mongoose.model('ChatData');
            const {chatName, username, content} = data;
            const newMessage = new ChatData({username, content});
            await newMessage.save().then(() => {
                broadcast('news', newMessage);
            })
        })

        // 断开连接
        socket.on('disconnect', () => {
            memberCount--;
            delete socketMap[socket.username];
            // 向其他人广播离开
            socket.broadcast.emit('notice', {
                memberCount,
                message: {
                    event: 'notice',
                    _id: getRandomId(),
                    content: `${socket.username}潇洒地离开了聊天室`
                }
            })
        })
    });
}

