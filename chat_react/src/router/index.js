import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {getCookie} from 'utils';
import Login from '@/views/Login';
import Chat from '@/views/Chat';

export default class Router extends React.Component{
    render(){
        return (
            <Switch>
                {/* 登录 */}
                <Route exact path="/login" component={Login}/>
                {/* 聊天界面 */}
                <PrivateRouter path="/">
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
                const hasAuthority = getCookie('username');
                if(hasAuthority){
                    return children;
                }else{
                    return <Redirect to={{
                        pathname: '/login',
                        state: {from: location}
                    }}/>
                }
            }}
        />
    )
}