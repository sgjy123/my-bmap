import React from "react";

const columnsOpt = [
    {
        title: '入库编号',
        key: 'storage_code',
        dataIndex: 'storage_code',
        width: 250,
        align: 'center',
        ellipsis: true
    },
    {
        title: '入库时间',
        key: 'storage_time',
        dataIndex: 'storage_time',
        width: 200,
        align: 'center',
        ellipsis: true
    },
    {
        title: '状态',
        key: 'storage_status',
        dataIndex: 'storage_status',
        width: 200,
        align: 'center',
        ellipsis: true,
        render: (text) => (
            <div>
                {text === 0 ? '已填写':''}
                {text === 5 ? '提交':''}
                {text === 10 ? '通过':''}
                {text === 15 ? '退回':''}
            </div>
        )
    },
    {
        title: '备注',
        key: 'remarks',
        dataIndex: 'remarks',
        align: 'center',
        ellipsis: true
    }
]
export {
    columnsOpt
}
