// 导入页面路由
import Map from 'pages/map';
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
        component: Map
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
