// import {readFile} from '../utils'
const {readFile} = require('../utils');

const data = readFile('../storage/chat_message_list.json');
data.then((data) => {
    const res = data.toString();
    console.log('mkLog: res', JSON.parse(res));

})
