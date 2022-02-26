import React from "react";

const columnsOpt = [
    {
        title: '合同名称',
        key: 'contract_name',
        dataIndex: 'contract_name',
        width: 250,
        align: 'center',
        ellipsis: true
    },
    {
        title: '合同编号',
        key: 'contract_code',
        dataIndex: 'contract_code',
        width: 200,
        align: 'center',
        ellipsis: true
    },
    {
        title: '甲方单位名称',
        key: 'unit_name',
        dataIndex: 'unit_name',
        width: 200,
        align: 'center',
        ellipsis: true
    },
    {
        title: '甲方联系人姓名',
        key: 'contacts_name',
        dataIndex: 'contacts_name',
        width: 80,
        align: 'center',
        ellipsis: true
    },
    {
        title: '项目编号',
        key: 'project_code',
        dataIndex: 'project_code',
        align: 'center',
        ellipsis: true
    },
    {
        title: '项目名称',
        key: 'project_name',
        dataIndex: 'project_name',
        align: 'center',
        ellipsis: true
    }
]
export {
    columnsOpt
}
