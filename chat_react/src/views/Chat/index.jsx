import React from 'react'
import Message from '@/components/Message'
import Heading from '@/components/Heading'
import ChatInput from '@/components/ChatInput'

import {getMsgList} from '@/api'
import './index.scss'

export default class Chat extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            msgList: [],
            ownUserName: '',
            chat_name: ''
        }
        this.chatWrapRef = React.createRef();
    }
    
    async componentDidMount(){
        try {
            const {status, data} = await getMsgList();
            if(status === 1){
                const {msgList, chat_name, ownUserName} = data;
                this.setState({
                    msgList,
                    chat_name,
                    ownUserName
                }, () => {
                    this.sliderDownNews();
                })
            }
        } catch (error) {
            console.error(error);
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
    // 更新msgList的回调
    onUpdateList = (msgList) => {
        this.setState({
            msgList
        }, () => {
            this.sliderDownNews();
        })
    }
    // 滑动到最新消息处
    sliderDownNews = () => {
        this.chatWrapRef.current.scrollTop = this.chatWrapRef.current.offsetHeight;
    }
    
    render(){
        const {ownUserName, chat_name, msgList} = this.state;
        return (
            <div className="chat">
                <Heading heading={chat_name}/>
                <div className="chat__content" ref={this.chatWrapRef}>
                    {this.getMessageList(msgList, ownUserName)}
                </div>
                <ChatInput
                    ownUserName={ownUserName}
                    chatName={chat_name}
                    onUpdateMsg={this.onUpdateList}
                />
            </div>
        )
    }
}