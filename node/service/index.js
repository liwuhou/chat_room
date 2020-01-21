const {connect, initSchemas} = require('./database/init');

module.exports = async() => {
    await connect();
    initSchemas();
}