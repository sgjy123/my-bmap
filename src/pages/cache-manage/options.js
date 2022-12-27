import React from "react";
import {Tooltip} from "antd";

const columnsOpt = [
    {
        title: '业务接口路径',
        key: 'requestPath',
        dataIndex: 'requestPath',
        align: 'center',
        ellipsis: {
            showTitle: false,
        },
        render: (requestPath) => (
            <Tooltip placement="topLeft" title={requestPath}>
                {requestPath}
            </Tooltip>
        ),
    },
    {
        title: '缓存接口请求方式',
        key: 'requestMethod',
        dataIndex: 'requestMethod',
        align: 'center',
        width: 200
    },
    {
        title: '有效时间（单位：秒）',
        key: 'cacheTimeout',
        dataIndex: 'cacheTimeout',
        align: 'center',
        sorter: true,
        width: 300,
        sortDirections: ['ascend']
    },
    {
        title: '最新一次刷新缓存时间',
        key: 'cacheLatestTime',
        dataIndex: 'cacheLatestTime',
        align: 'center',
        sorter: true,
        width: 300,
        sortDirections: ['ascend']
    },
    {
        title: '创建时间',
        key: 'createTime',
        dataIndex: 'createTime',
        align: 'center',
        width: 200,
    },
    {
        title: '更新时间',
        key: 'updateTime',
        dataIndex: 'updateTime',
        align: 'center',
        width: 200,
    },
    {
        title: '状态',
        key: 'status',
        dataIndex: 'status',
        width: 100,
        align: 'center',
        ellipsis: true,
        render: (txt) => (
            <div>
                {
                    txt === 1 ? '有效' : '无效'
                }
            </div>
        )
    }
]
export {
    columnsOpt
}
