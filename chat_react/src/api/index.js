import axios from 'axios'
import URL from './serverApi';


// 注册/登录
export const login = async (params) => {
    const {data} = await axios.post(URL.login, params);
    return data;
}

// 获取聊天记录
export const getMsgList = async (params) => {
    const {data} = await axios.get(URL.getMsgList, params);
    return data;
}

// 发送信息
export const sendMsg = async (params) => {
    const {data} = await axios.post(URL.sendMsg, params);
    return data;
}
