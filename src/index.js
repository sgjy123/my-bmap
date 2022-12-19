import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
// 导入入口样式
import './index.css';
// 导入路由
import routes from 'routes/home';
// 导入css浏览器reset
import "normalize.css";
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';

ReactDOM.render(
    <ConfigProvider locale={zhCN}>
        <Router>
            <Switch>
                {
                    routes.map((route) => {
                        return route.redirect ? <Redirect {...route}/> : <Route {...route}/>
                    })
                }
            </Switch>
        </Router>
    </ConfigProvider>,
    document.getElementById('root')
);
