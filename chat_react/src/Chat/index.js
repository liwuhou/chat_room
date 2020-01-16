import React from 'react'
import Message from '../components/Message'
import Heading from '../components/Heading'
import ChatInput from '../components/ChatInput'

import './index.scss'
import {getMsgList} from '../api'

export default class Chat extends React.Component{
    state = {
        msgList: [],
        ownUserName: '',
        chat_name: ''
    }
    async componentDidMount(){
        try {
            const {data} = await getMsgList();
            if(data.status === 1){
                const {msgList, chat_name, ownUserName} = data.data;
                this.setState({
                    msgList,
                    chat_name,
                    ownUserName
                })
            }
        } catch (error) {
            console.error('mkLog: Chat -> componentDidMount -> error', error);
        }
    }
    // 获取消息列表
    getMessageList = (list, ownUserName) => {
        return list.map(({id, time, userName, content}, idx) => (
            <Message
                key={id}
                time={time}
                content={content}
                userName={userName}
                isShowTime={idx % 4 === 0}
                isSelf={userName === ownUserName}
            />
        ))
    }
    render(){
        const {ownUserName, chat_name, msgList} = this.state;
        return (
            <div className="chat">
                <Heading heading={chat_name}/>
                <div className="chat__content">
                    {this.getMessageList(msgList, ownUserName)}
                </div>
                <ChatInput
                    ownUserName={ownUserName}
                    chatName={chat_name}
                />
            </div>
        )
    }
}