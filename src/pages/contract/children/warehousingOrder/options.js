import React from "react";

const columnsOpt = [
    {
        title: '入库单号',
        key: 'entry_code',
        dataIndex: 'entry_code',
        width: 250,
        align: 'center',
        ellipsis: true
    },
    {
        title: '物资名称',
        key: 'material_name',
        dataIndex: 'material_name',
        width: 200,
        align: 'center',
        ellipsis: true
    },
    {
        title: '规格',
        key: 'specification',
        dataIndex: 'specification',
        width: 200,
        align: 'center',
        ellipsis: true
    },
    {
        title: '单位',
        key: 'unit',
        dataIndex: 'unit',
        align: 'center',
        ellipsis: true
    },
    {
        title: '数量',
        key: 'quantity',
        dataIndex: 'quantity',
        align: 'center',
        ellipsis: true
    },
    {
        title: '金额',
        key: 'amount_money',
        dataIndex: 'amount_money',
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
        title: '冲红价税合计',
        key: 'writeoff_total',
        dataIndex: 'writeoff_total',
        align: 'center',
        ellipsis: true
    }
]
export {
    columnsOpt
}
