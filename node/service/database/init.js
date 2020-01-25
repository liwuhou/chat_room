const mongoose = require('mongoose');
const glob = require('glob');
const {resolve} = require('path');

const db_url = "mongodb://liwuhou.cn:27017/chat";
const options = {
    keepAlive: 1,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
}

// 链接数据库
exports.connect = () => {
    // 连接数据库
    mongoose.connect(db_url, options);

    let maxConnectTimes = 0;

    return new Promise((resolve, reject) => {
    
        // 监听数据库连接事件
        mongoose.connection.on('disconnection', () => {
            console.log('***********数据库断开***********');
            if(maxConnectTimes++ < 3){
                mongoose.connect(db);  
            }else{
                reject()
                throw new Error('数据库出现问题，程序无法搞定，请人为修理......');
            }
        })
    
        // 数据库出现错误时
        mongoose.connection.on('error', err => {
            console.log('***********数据库错误***********');
            if(maxConnectTimes++ <3){
                mongoose.connect(db); 
            }else{
                reject(err)
                throw new Error('数据库出现问题，程序无法搞定，请人为修理......');
            }
        })
    
        // 链接打开的时候
        mongoose.connection.once('open', () => {
            console.log('MongoDB Connected Successfully!');
            resolve();
        })
    })
}

// 引入所有Schema文件
exports.initSchemas = () => {
    glob.sync(resolve(__dirname, './schema/', '*.js')).forEach(require);
}
