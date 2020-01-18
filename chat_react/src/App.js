import React from 'react';
import Chat from './Chat';
import {changeTitle} from 'utils';

export default function App(){
    changeTitle();
    return (
        <Chat/>
    );
}