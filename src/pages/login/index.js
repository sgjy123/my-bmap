import React, {useEffect, useRef, useState} from "react";
import { useHistory } from "react-router-dom";
import { createFromIconfontCN } from '@ant-design/icons'; // 导入图标
import AnalogClock from 'r-analog-clock'; // 导入了一个时钟插件
import CustomIcon from "../../components/CustomIcon"; // svg自定义组件
import {Thor, Arrow} from './svg'; // 导入svg
import './index.css'; // 导入样式
import ClockBg from './../../assets/images/login/clock-bg.jpeg'; // 时钟背景图
import routes from "../../routes/pages";
import {message} from "antd";
import {loginUrl} from "service/api/login";
function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const ac = useRef(); // 时钟
    const history = useHistory();
    const [userTips, setUserTips] = useState(false);
    const [passTips, setPassTips] = useState(false);
    useEffect(()=>{
        ac.current.run(); // 开启时钟
        /*return ()=>{
            ac.current.stop(); // 关闭时钟
        }*/
    },[]);
    // 登录
    const onLogin = ()=>{
        if (username.trim() === '') {
            setUserTips(true);
            return false;
        } else {
            setUserTips(false);
        }
        if (password.trim() === '') {
            setPassTips(true);
            return false;
        } else {
            setPassTips(false);
        }
        // 1.请求接口
        loginUrl({
            username,
            password
        }).then((res)=>{
            const {code} = res;
            if (code === 200) {
                // 2.跳转
                localStorage.setItem('USERNAME_CACHE', username);
                history.push(routes[0].path);
            } else {
                message.error('登录失败，请检查用户名密码是否正确！')
            }
        })
        // 1.请求接口
        /*fetch(process.env.REACT_APP_BASE_API+'/pontos/user/login', {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                username,
                password
            })
        }).then(res => res.json()).then(data => {
            const {code} = data;
            if (code === 200) {
                // 2.跳转
                localStorage.setItem('userName', username);
                history.push(routes[0].path);
            } else {
                message.error('登录失败，请检查用户名密码是否正确！')
            }
        })*/
    }
    const changeUsername = (e)=> {
        if (e.target.value.trim() === '') {
            setUserTips(true);
        } else {
            setUserTips(false);
        }
        setUsername(e.target.value);
    }
    const changePassword = (e)=> {
        if (e.target.value.trim() === '') {
            setPassTips(true);
        } else {
            setPassTips(false);
        }
        setPassword(e.target.value);
    }
    return (
        <div className='login'>
            {/*一堆小云*/}
            <div id="clouds-content">
                <div id="clouds">
                    <div className="cloud-1" data-speed="35000" />
                    <div className="cloud-2" data-speed="45000" data-delay="15000"/>
                    <div className="cloud-3" data-speed="40000" />
                    <div className="cloud-4" data-speed="38000" data-delay="20000"/>
                </div>
            </div>
            {/*一个时钟*/}
            <div className='login-clock'>
                <AnalogClock ref={ac}
                             size={260}
                             borderColor='#C3D57D'
                             borderWidth={4}
                             backgroundAlpha={0.6}
                             scaleColor='#DA4949'
                             handType='line'
                             backgroundImage={ClockBg} />
            </div>
            {/*登录体验区*/}
            <div className='login-content'>
                <div className='login-content_header'>
                    <CustomIcon svg={Thor} style={{
                        fontSize: '30px'
                    }}/>
                    {/*众神之殿-*/}系统管理
                </div>
                <div className='login-content_content'>
                    <div className='login-content_content-line'>
                        <input className="tip"
                               name="username"
                               type="text"
                               onChange={(e)=>{ changeUsername(e) }} />
                        <label htmlFor="username">用户名</label>
                        <div className={userTips ? 'tooltip show' : 'tooltip hide'}>填写您的用户名</div>
                    </div>
                    <div className='login-content_content-line'>
                        <input className="tip"
                               name="password"
                               type="password"
                               onChange={(e)=>{ changePassword(e) }} />
                        <label htmlFor="password">密码</label>
                        <div className={passTips ? 'tooltip show' : 'tooltip hide'}>填写您的密码</div>
                    </div>
                </div>
                <div className="login-content_footer">
                    <button className="login_btn" onClick={onLogin}>
                        <div className="login_btn-container">
                            <div className="login_btn-icon">
                                <CustomIcon svg={Arrow} style={{
                                    fontSize: '28px',
                                    color: '#fff'
                                }}/>
                            </div>
                            <span>登录</span>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Login;
