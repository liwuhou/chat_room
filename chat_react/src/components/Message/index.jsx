import React from 'react'
import Timer from './components/Timer'
import Content from './components/Content'

export default function Message({isShowTime, time, content, userName, isSelf = false}){
    return (
        <div className="message_wrap">
            {isShowTime && <Timer time={time}/>}
            <Content
                isSelf={isSelf}
                userName={userName}
                content={content}
            />
        </div>
    )
}