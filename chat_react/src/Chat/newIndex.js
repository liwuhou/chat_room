import React, {useState} from 'react'
import Message from '../Message'

import './index.scss'

export default function Chat(){
    const [msgList] = useState([
        {userName: 'william', content: 'test1', time:'1565920295180', id: 1},
        {userName: 'skye', content: 'test2', time:'1565920295880', id: 2}
    ])
    const [ownUserName] = useState('william');

    return (
        <div className="chat">
            {
                msgList.map(({id, time, userName, content}) => (
                    <Message
                        key={id}
                        time={time}
                        isSelf={userName === ownUserName}
                        userName={userName}
                        content={content}
                    />
                ))
            }
        </div>
    )
}