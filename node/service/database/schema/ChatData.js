const mongoose = require('mongoose');
const Schema = mongoose.Schema; // 声明Schema
let ObjectId = Schema.Types.ObjectId;

// 创建一条聊天记录
const chatData = new Schema({
    id: ObjectId,
    username: {unique: false, type: String, required: true},
    content: {type: String},
    time: {type: Date, default: Date.now()}
}, {
    collection: 'chatData'
})

// 发布模型
mongoose.model('ChatData', chatData);