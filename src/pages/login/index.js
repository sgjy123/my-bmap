import React from "react";
import { useHistory } from 'react-router-dom';
import {Button, Form, Input, message} from 'antd';
import {LockOutlined, UserOutlined} from '@ant-design/icons';

import './index.css';
import imgAiWrap from 'assets/images/login/aiwrap.png';
import {loginUrl} from 'service/api/login';

function Login() {
    const history = useHistory();
    const onFinish = ({username, password}) => {
        loginUrl({
            username,
            password
        }).then(({code,data,msg})=>{
            if (code === 200) {
                message.success('登录成功');
                window.localStorage.setItem('username',data.username);
                history.push('/layout/contract');
            } else {
                message.error(msg);
            }
        });
    };
    return (
        <div className='login'>
            <div className="login-body">
                <div className="login-body-title">
                    <div className='title'>ERP系统登录</div>
                    <div className='icon'>
                        <img src={imgAiWrap} alt="icon"/>
                    </div>
                </div>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}>
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: '请输入用户名！',
                            },
                        ]}>
                        <Input size="large"
                               autoComplete="off"
                               prefix={<UserOutlined className="site-form-item-icon"/>}
                               placeholder="用户名"/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码！',
                            },
                        ]}>
                        <Input
                            size="large"
                            autoComplete="off"
                            prefix={<LockOutlined className="site-form-item-icon"/>}
                            type="password"
                            placeholder="密码"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button block
                                size='large'
                                type="primary"
                                htmlType="submit"
                                className="login-form-button">登录</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Login;
