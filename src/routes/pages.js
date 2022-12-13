// 导入页面路由
import Map from 'pages/map';
import Page1 from 'pages/map/children/page1';
import Table from 'pages/table';
import CacheManage from 'pages/cache-manage';
import Contract from 'pages/contract';
import React from "react";
import {
    CloudSyncOutlined,
    UnorderedListOutlined,
    HeatMapOutlined,
    TableOutlined
} from '@ant-design/icons';

const routes = [
    /*{
        path: '/layout/map',
        key: '/layout/map',
        name: "地图基础",
        icon: <HeatMapOutlined/>,
        component: Map,
        children: [
            {
                path: '/layout/map/page1',
                key: '/layout/map/page1',
                name: "创建地图",
                component: Page1,
            }
        ]
    },
    {
        path: '/layout/table',
        key: '/layout/table',
        name: "表格基础",
        icon: <TableOutlined />,
        component: Table
    },*/
    /*{
        path: '/layout/contract',
        key: '/layout/contract',
        name: "合约业务服务",
        icon: <UnorderedListOutlined />,
        component: Contract
    },*/
    {
        path: '/layout/cache-manage',
        key: '/layout/cache-manage',
        name: "缓存管理",
        icon: <CloudSyncOutlined />,
        component: CacheManage
    }
];
export default routes;
