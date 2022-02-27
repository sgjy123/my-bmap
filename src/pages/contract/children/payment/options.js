import React from "react";

const columnsOpt = [
    {
        title: '款项名称',
        key: 'payment_name',
        dataIndex: 'payment_name',
        width: 250,
        align: 'center',
        ellipsis: true
    },
    {
        title: '款项类型',
        key: 'payment_type',
        dataIndex: 'payment_type',
        width: 200,
        align: 'center',
        ellipsis: true
    },
    {
        title: '金额',
        key: 'amount_money',
        dataIndex: 'amount_money',
        width: 200,
        align: 'center',
        ellipsis: true
    },
    {
        title: '税额',
        key: 'amount_tax',
        dataIndex: 'amount_tax',
        align: 'center',
        ellipsis: true
    },
    {
        title: '价税合计',
        key: 'amount_total',
        dataIndex: 'amount_total',
        align: 'center',
        ellipsis: true
    },
    {
        title: '状态',
        key: 'payment_status',
        dataIndex: 'payment_status',
        align: 'center',
        ellipsis: true
    },
    {
        title: '实际付款比例',
        key: 'payment_percent',
        dataIndex: 'payment_percent',
        align: 'center',
        ellipsis: true
    },
    {
        title: '实际付款金额',
        key: 'payment_money',
        dataIndex: 'payment_money',
        align: 'center',
        ellipsis: true
    },
    {
        title: '票据号码',
        key: 'bill_number',
        dataIndex: 'bill_number',
        align: 'center',
        ellipsis: true
    }
]
export {
    columnsOpt
}
