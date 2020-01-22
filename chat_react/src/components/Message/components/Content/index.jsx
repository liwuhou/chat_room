import React from 'react'
import './index.scss';

const getuserIcon = (name = '') => {
    const hasCn = name.match(/[\u4e00-\u9fa5]/g);
    if(hasCn && hasCn.length){
        const length = name.length;
        return name.slice(length - 2);
    }else{
        return name.slice(0, 4);
    }
}

export default function Content({isSelf, username, content}){
    return(
        <div className={`message ${isSelf ? 'right' : 'left'}_message`}>
            <div className="user">
                <span className="user_icon">{getuserIcon(username)}</span>
            </div>
            <div className="speech">
                <div className="username">{username}</div>
                <div className="content">{content}</div>
            </div>
        </div>
    )
}


