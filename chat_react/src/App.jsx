import React from 'react';
import {HashRouter} from 'react-router-dom';
import Router from './router';
import {changeTitle} from 'utils';

export default function App(){
    changeTitle();
    return (
        <HashRouter>
            <Router/>
        </HashRouter>
    );
}