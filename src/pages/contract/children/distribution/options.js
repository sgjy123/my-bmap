import React from "react";

const columnsOpt = [
    {
        title: '单据类型',
        key: 'distribution_type',
        dataIndex: 'distribution_type',
        width: 250,
        align: 'center',
        ellipsis: true
    },
    {
        title: '制单时间',
        key: 'generation_time',
        dataIndex: 'generation_time',
        width: 200,
        align: 'center',
        ellipsis: true
    },
    {
        title: '状态',
        key: 'distribution_status',
        dataIndex: 'distribution_status',
        width: 200,
        align: 'center',
        ellipsis: true,
        render: (text) => (
            <div>
                {text === -1 ? '撤回':''}
                {text === 0 ? '未配送':''}
                {text === 1 ? '已配送':''}
                {text === 2 ? '已送达':''}
            </div>
        )
    },
    {
        title: '收货联系人',
        key: 'receiver',
        dataIndex: 'receiver',
        align: 'center',
        ellipsis: true
    },
    {
        title: '收货地址',
        key: 'receiver_address',
        dataIndex: 'receiver_address',
        align: 'center',
        ellipsis: true
    },
    {
        title: '发货联系人',
        key: 'sender',
        dataIndex: 'sender',
        align: 'center',
        ellipsis: true
    },
    {
        title: '发货地址',
        key: 'sender_address',
        dataIndex: 'sender_address',
        align: 'center',
        ellipsis: true
    },
    {
        title: '承运单位名称',
        key: 'carrier',
        dataIndex: 'carrier',
        align: 'center',
        ellipsis: true
    },
]
export {
    columnsOpt
}
