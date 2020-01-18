import React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter} from 'react-router-dom';
import App from './App'

import './config/fit2rem.js'
import './css/index.scss'

ReactDOM.render(
    <HashRouter>
        <App/>
    </HashRouter>,
    document.getElementById('root')
);