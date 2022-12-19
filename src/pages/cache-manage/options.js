import React from "react";

const columnsOpt = [
    {
        title: '业务接口路径',
        key: 'requestPath',
        dataIndex: 'requestPath',
        align: 'center',
        ellipsis: true
    },
    {
        title: '缓存接口请求方式',
        key: 'requestMethod',
        dataIndex: 'requestMethod',
        align: 'center',
        ellipsis: true
    },
    {
        title: '有效时间（单位：秒）',
        key: 'cacheTimeout',
        dataIndex: 'cacheTimeout',
        align: 'center',
        ellipsis: true,
        sorter: true,
        sortDirections: ['ascend']
    },
    {
        title: '最新一次刷新缓存时间',
        key: 'cacheLatestTime',
        dataIndex: 'cacheLatestTime',
        align: 'center',
        ellipsis: true,
        sorter: true,
        sortDirections: ['ascend']
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
