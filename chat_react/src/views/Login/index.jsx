import React from 'react';
import Alert from '@/components/Alert';

import {login} from '@/api'
import './index.scss';

export default class Login extends React.Component{
    constructor(props){
        super(props);
        // 获取到from信息
        const {from} = this.props.location.state || {from: {pathname: '/'}}
        this.state = {
            from,
            username: '',
            password: '',
            AlertProps: {
                isShow: false,
                title: '提示',
                description: '',
                onConfirm: this.onAlertConfirm,
            },
        }
        
    }
    // 输入用户名
    handleChangeUsername = (event) => {
        const username = event.target.value.replace(/\s+/, '');
        this.setState({
            username
        })
    }
    
    // 输入密码
    handleChangePawsword = (event) => {
        const password = event.target.value;
        this.setState({
            password
        })
    }

    handleKeyUpLogin = (event) => {
        if(event.keyCode === 13) return this.handleClickSubmitUserData();
    }

    // 进入
    handleClickSubmitUserData = async () => {
        const {username, password} = this.state;
        if(!username) return this.showAlert('请输入摸鱼者大名！');
        if(!password) return this.showAlert('请输入摸鱼口令！');
        if(username.length < 2) return this.showAlert('行走江湖名号怎可少于两个字！');
        if(username.length > 8) return this.showAlert('摸鱼人的大名再大也大不过八个字！');
        if(password.length < 6) return this.showAlert('口令太短，阁下请重新输过！');
        if(password.length > 16) return this.showAlert('口令这么长，我都记不过来！');

        const data = await login({username, password});
        if(data.status !== 1) return this.showAlert(data.message);
        
        // 验证成功，跳转回前一个页面
        this.props.history.replace(this.state.from);
    }

    // 弹框展示
    showAlert(description, title = '提示'){
        this.setState(({AlertProps}) => ({
            AlertProps: {
                ...AlertProps,
                isShow: true,
                title,
                description
            }
        }))
    }

    // 弹框中的确定
    onAlertConfirm = () => {
        this.setState(({AlertProps}) => ({
            AlertProps: {
                ...AlertProps,
                isShow: false,
                description: ''
            }
        }))   
    }
    
    render(){
        return (
            <div className="login">
                <img className="login__sologan" src="./sologan.svg" alt="武陵人摸鱼为业"/>
                <div className="login__input">
                    <label htmlFor="username" className="login__input_label">摸鱼人：</label>
                    <input
                        type="text"
                        id="username" 
                        placeholder="请输入昵称"
                        value={this.state.username}
                        onKeyUp={this.handleKeyUpLogin}
                        onChange={this.handleChangeUsername}
                    />
                </div>
                <div className="login__input">
                    <label htmlFor="password" className="login__input_label">摸鱼口令：</label>
                    <input 
                        id="password" 
                        type="password" 
                        placeholder="请输入密码"
                        value={this.state.password} 
                        onKeyUp={this.handleKeyUpLogin}
                        onChange={this.handleChangePawsword}
                    />
                </div>
                <div className="login__submit">
                    <input
                        value="进 入" 
                        type="button" 
                        onClick={this.handleClickSubmitUserData}
                    />
                </div>

                <Alert {...this.state.AlertProps}/>
            </div>
        )
    }
}