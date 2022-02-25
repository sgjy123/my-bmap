import React, {useEffect, useState} from 'react';
import {Route, Switch, useHistory, useLocation} from 'react-router-dom';
// 组件
import {Layout, Menu} from 'antd';
import {MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons';
// 配置
import routes from 'routes/pages';
// 样式
import './index.css';
// 资源
import logo from 'assets/images/logox1.png';
import logoSmall from 'assets/images/logo-small.png';

const {Sider, Content, Header} = Layout;
const {SubMenu} = Menu;

function ALayout(props) {
    const location = useLocation();
    const history = useHistory();
    const [collapsed, setCollapsed] = useState(false);
    const [currentNav, setCurrentNav] = useState(getUrl());

    useEffect(()=>{
    },[]);

    function toggle() {
        setCollapsed(!collapsed);
    }

    function getUrl() {
        const {pathname} = location;
        console.log(pathname);
        return pathname === '/' ? pathname.split('/')[pathname.split('/').length - 1] : '/layout/map'
    }

    function handleNavMenu({key}) {
        setCurrentNav(key);
        history.push(`${key}`)
    }

    return (
        <Layout className='layout'>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className={collapsed ? 'logo logo-small' : 'logo'}>
                    <img className="logo-img" src={collapsed ? logoSmall : logo} alt="百度地图"/>
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
                <Header className="site-layout-background" style={{padding: 0}}>
                    <div onClick={toggle} className="operation">
                        {
                            collapsed ? (<MenuUnfoldOutlined className="trigger"/>) : (
                                <MenuFoldOutlined className="trigger"/>)
                        }
                    </div>
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
