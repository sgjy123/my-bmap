import React, {useEffect, useRef} from "react";
import { useHistory } from "react-router-dom";
import { createFromIconfontCN } from '@ant-design/icons'; // 导入图标
import AnalogClock from 'r-analog-clock'; // 导入了一个时钟插件
import CustomIcon from "../../components/CustomIcon"; // svg自定义组件
import {Thor, Arrow} from './svg'; // 导入svg
import './index.css'; // 导入样式
import ClockBg from './../../assets/images/login/clock-bg.jpeg'; // 时钟背景图
import routes from "../../routes/pages";
function Login() {
    const ac = useRef(); // 时钟
    const history = useHistory();
    useEffect(()=>{
        ac.current.run(); // 开启时钟
        return ()=>{
            ac.current.stop(); // 关闭时钟
        }
    },[]);
    // 登录
    const onLogin = ()=>{
        // 1.请求接口
        // 2.跳转
        localStorage.setItem('userName', '123789')
        history.push(routes[0].path);
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
                        <input className="tip" name="username" type="text" />
                        <label htmlFor="username">用户名</label>
                        <div className="tooltip">填写您的用户名</div>
                    </div>
                    <div className='login-content_content-line'>
                        <input className="tip" name="password" type="password" />
                        <label htmlFor="username">密码</label>
                        <div className="tooltip">填写您的密码</div>
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
