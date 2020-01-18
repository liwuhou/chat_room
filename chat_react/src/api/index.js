import axios from 'axios'
import URL from './serverApi';

// const HOST = 'http://localhost';

export const getMsgList = async (params) => {
    const {data} = await axios.get(URL.getMsgList, params);
    return data;
}

export const sendMsg = async (params) => {
    const {data} = await axios.post(URL.sendMsg, params);
    return data;
}
