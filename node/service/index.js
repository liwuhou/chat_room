const mongoose = require('mongoose');
const {connect, initSchemas} = require('./database/init');

module.exports = async() => {
    await connect();
    initSchemas();
    const User = mongoose.model('User');
    let oneUser = new User({userName: 'abby', password: '123456'});
    oneUser.save().then(() => {
        console.log('插入成功');
    })
    let users = await User.findOne({});
    console.log('mkLog: users', users);
}