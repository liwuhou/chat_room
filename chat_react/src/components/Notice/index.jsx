import React from 'react'
import './index.scss';

export default function({content}) {
    return (
        <li className="notice_wrap">
            {content}
        </li>
    )
}