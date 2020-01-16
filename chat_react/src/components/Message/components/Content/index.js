import React from 'react'
// import {notice} from '../../../../config'

const getuserIcon = (name = '') => {
    const hasCn = name.match(/[\u4e00-\u9fa5]/g);
    if(hasCn && hasCn.length){
        const length = name.length;
        return name.slice(length - 2);
    }else{
        return name.slice(0, 4);
    }
}

export default function Content({isSelf, userName, content}){
    return(
        <div className={`message ${isSelf ? 'right' : 'left'}_message`}>
            <div className="user">
                <span className="user_icon">{getuserIcon(userName)}</span>
            </div>
            <div className="content">{content}</div>
        </div>
    )
}


