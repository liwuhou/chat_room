import React from 'react'
import Timer from './components/Timer'
import Content from './components/Content'

export default function Message({isShowTime, time, content, username, isSelf = false}){
    return (
        <div className="message_wrap">
            {isShowTime && <Timer time={time}/>}
            <Content
                isSelf={isSelf}
                username={username}
                content={content}
            />
        </div>
    )
}