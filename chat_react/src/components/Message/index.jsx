import React from 'react'
import Timer from './components/Timer'
import Content from './components/Content'
import './index.scss';

export default function Message({isShowTime, time, content, username, isSelf = false}){
    return (
        <li className="message_wrap">
            {isShowTime && <Timer time={time}/>}
            <Content
                isSelf={isSelf}
                username={username}
                content={content}
            />
        </li>
    )
}