import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import Login from '@/views/Login';
import Chat from '@/views/Chat';

export default class Router extends React.Component{
    render(){
        return (
            <Switch>
                {/* 登录 */}
                <Route path="/login" component={Login}/>
                {/* 聊天界面 */}
                <PrivateRouter path="/chat">
                    <Chat/>
                </PrivateRouter>
            </Switch>
        )
    }
}

// 权限拦截
function PrivateRouter({children, ...props}){
    return (
        <Route
            {...props}
            render={({location}) => {
                if(/* 有权限 */''){
                    return children;
                }else{
                    return <Redirect to={{
                        pathname: '/login',
                        state: {form: location}
                    }}/>
                }
            }}
        />
    )
}