import React from "react";
import {Tooltip} from "antd";

const columnsOpt = [
    {
        title: '请求参数',
        key: 'requestParam',
        dataIndex: 'requestParam',
        align: 'center',
        ellipsis: {
            showTitle: false,
        },
        render: (requestParam) => (
            <Tooltip placement="topLeft" title={requestParam}>
                {requestParam}
            </Tooltip>
        ),
    },
    {
        title: '缓存key',
        key: 'cacheKey',
        dataIndex: 'cacheKey',
        align: 'center',
        ellipsis: {
            showTitle: false,
        },
        render: (cacheKey) => (
            <Tooltip placement="topLeft" title={cacheKey}>
                {cacheKey}
            </Tooltip>
        ),
    },
    {
        title: '最新缓存时间',
        key: 'cacheLatestTime',
        dataIndex: 'cacheLatestTime',
        align: 'center',
        sorter: true,
        sortDirections: ['ascend']
    },
    {
        title: '缓存剩余有效时间',
        key: 'seconds',
        dataIndex: 'seconds',
        align: 'center',
        render: (text, data) => (
            <div>{data.cacheLatestResult === 1 ? text : ''}</div>
        ),
    },
    {
        title: '缓存状态',
        key: 'cacheStatus',
        dataIndex: 'cacheStatus',
        align: 'center',
    }
]

export {
    columnsOpt
}
