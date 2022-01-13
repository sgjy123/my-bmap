// 导入页面路由
import Map from 'pages/map';
import Page1 from 'pages/map/children/page1';
import Table from 'pages/table';
import React from "react";
import {
    HeatMapOutlined,
    TableOutlined
} from '@ant-design/icons';

const routes = [
    {
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
    },
];
export default routes;
