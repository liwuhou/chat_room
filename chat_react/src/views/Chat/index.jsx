import React from 'react'
import Message from '@/components/Message'
import Heading from '@/components/Heading'
import ChatInput from '@/components/ChatInput'

import {getMsgList} from '@/api'
import { getCookie } from 'utils'
import './index.scss'

export default class Chat extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            msgList: [],
            ownUserName: decodeURI(getCookie('username')),
            chatName: '摸鱼俱乐部'
        }
        this.chatWrapRef = React.createRef();
    }
    
    async componentDidMount(){
        try {
            const {chatName} = this.state;
            const res = await getMsgList({chatName});
            if(res.status === 1){
                const {msgList, chatName} = res.data;
                this.setState({
                    msgList,
                    chatName
                }, () => {
                    this.sliderDownNews();
                })
            }
        } catch (error) {
            console.error(error);
        }
    }
    // 渲染消息列表
    renderMessageList = (list, ownUserName) => {
        return list.map(({_id, time, username, content}, idx) => (
            <Message
                key={_id}
                time={time}
                content={content}
                username={username}
                isShowTime={idx % 4 === 0}
                isSelf={username === ownUserName}
            />
        ))
    }
    // 更新msgList的回调
    onUpdateList = (message) => {
        this.setState((preState) => ({
            msgList: [
                ...preState.msgList,
                message
            ]
        }), () => {
            this.sliderDownNews();
        })
    }
    // 滑动到最新消息处
    sliderDownNews = () => {
        this.chatWrapRef.current.scrollTop = this.chatWrapRef.current.offsetHeight;
    }
    
    render(){
        const {ownUserName, chatName, msgList} = this.state;
        return (
            <div className="chat">
                <Heading heading={chatName}/>
                <div className="chat__content" ref={this.chatWrapRef}>
                    {this.renderMessageList(msgList, ownUserName)}
                </div>
                <ChatInput
                    ownUserName={ownUserName}
                    chatName={chatName}
                    onUpdateMsg={this.onUpdateList}
                />
            </div>
        )
    }
}