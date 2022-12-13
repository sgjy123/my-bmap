import React, {useEffect, useState} from 'react';
import {Route, Switch, useHistory, useLocation} from 'react-router-dom';
// 组件
import {Avatar, Dropdown, Layout, Menu} from 'antd';
import {MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons';
// 配置
import routes from 'routes/pages';
// 样式
import './index.css';
// 资源
import logo from 'assets/images/menu/menu-logo.png';
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";

const {Sider, Content, Header} = Layout;
const {SubMenu} = Menu;
function ALayout(props) {
    const location = useLocation();
    const history = useHistory();
    const [collapsed, setCollapsed] = useState(false);
    const [currentNav, setCurrentNav] = useState(getUrl());
    const [userName, setUserName] = useState(localStorage.getItem('username'));

    useEffect(()=> {
        if (localStorage.getItem('userName') === '') {
            history.push('/login');
        } else {
            setUserName(localStorage.getItem('username'));
        }
    },[localStorage.getItem('username')]);

    function toggle() {
        setCollapsed(!collapsed);
    }

    function getUrl() {
        const {pathname} = location;
        return pathname === '/' ? pathname.split('/')[pathname.split('/').length - 1] : '/layout/contract'
    }

    function handleNavMenu({key}) {
        setCurrentNav(key);
        history.push(`${key}`)
    }

    function handleLoginMenu(e) {
        const {key} = e;
        if (key === 'logout') {
            localStorage.setItem('userName', '');
            history.push('/login');
        }
    }

    // 退出登录菜单
    const loginMenu = (
        <Menu theme="dark" onClick={handleLoginMenu} className="navMenu">
            <Menu.Item key="logout">
                退出登录
            </Menu.Item>
        </Menu>
    )

    return (
        <Layout className='layout'>
            <Sider theme="dark" trigger={null} collapsible collapsed={collapsed}>
                <div className={collapsed ? 'logo logo-small' : 'logo'}>
                    <img className="logo-img" src={collapsed ? logo : logo} alt="系统管理"/>
                    <span className="txt" >系统管理</span>
                </div>
                <Menu theme="dark"
                      mode="inline"
                      onClick={handleNavMenu}
                      selectedKeys={[currentNav]}>
                    {
                        routes.map((nav) => {
                            return (
                                nav.children ?
                                    <SubMenu key={nav.key} icon={nav.icon} title={nav.name}>
                                        {
                                            nav.children &&
                                            nav.children.map((child) => (
                                                <Menu.Item key={child.key}>{child.name}</Menu.Item>
                                            ))
                                        }
                                    </SubMenu> :
                                    (<Menu.Item key={nav.key} icon={nav.icon}>{nav.name}</Menu.Item>)
                            )
                        })
                    }
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background site-layout-header" style={{padding: 0}}>
                    <div onClick={toggle} className="operation">
                        {
                            collapsed ? (<MenuUnfoldOutlined className="trigger"/>) : (
                                <MenuFoldOutlined className="trigger"/>)
                        }
                    </div>
                    <Dropdown overlay={loginMenu} trigger="hover" placement="bottomCenter">
                        <div className="user">
                            <Avatar style={{backgroundColor: '#87d068'}} icon={<UserOutlined/>}/>
                            <span className='user-name'>{userName}</span>
                        </div>
                    </Dropdown>
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '15px',
                        minHeight: 280,
                    }}>
                    <Switch>
                        {
                            routes.map((route) => {
                                return route.children ? (
                                    route.children.map((childRoute) => {
                                        return (<Route {...childRoute}/>)
                                    })
                                ) : (<Route {...route}/>)
                            })
                        }
                    </Switch>
                </Content>
            </Layout>
        </Layout>
    )
}

export default ALayout;
