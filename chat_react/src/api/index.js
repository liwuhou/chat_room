import axios from 'axios'

// const HOST = 'http://localhost';

export const getMsgList = (params) => {
    return axios.get('/api/getMsgList', params);
}

export const sendMsg = (params) => {
    return axios.post('/api/sendMsg', params);
}
