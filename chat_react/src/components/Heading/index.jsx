import React from 'react'
import './index.scss';

export default function Heading({heading, count}){
    return (
        <div className="chat__heading">{heading}({count})</div>
    )
}
