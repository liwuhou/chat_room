const mongoose = require('mongoose');
const Schema = mongoose.Schema; // 声明Schema
let ObjectId = Schema.Types.ObjectId;

// 创建用户Schema
// TODO: 可做数据加密加盐处理
const userSchema = new Schema({
    UserId: ObjectId,
    username: {unique: true, type: String, required: true},
    password: {type: String, required: true},
    createAt: {type: Date, default: Date.now()},
    lastLoginAt: {type: Date, default: Date.now()}
}, {
    collection: 'user'
})

// 发布模型
mongoose.model('User', userSchema);