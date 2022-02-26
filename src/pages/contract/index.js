import React, {useEffect, useState} from "react";
import {Button, Col, ConfigProvider, Form, Input, message, Pagination, Row, Table} from 'antd';
import zh_CN from 'antd/es/locale/zh_CN';
import {SearchOutlined} from '@ant-design/icons';
import './index.css';
import {contractListUrl} from 'service/api/contract';
import {columnsOpt} from './options';
function Contract() {
    const [columns, setColumns] = useState([
        ...columnsOpt,
        {
            fixed: 'right',
            title: '操作',
            align: 'center',
            render: (text, record) => (
                <Button type='primary' onClick={()=>{material(record)}}>物资明细</Button>
            )
        },
    ])
    const [searchParam, setSearchParam] = useState({
        "page_num": 1,
        "page_size": 10,
        "contract_name": '',
        "contract_code": ''
    })
    const [contractData, setContract] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getContractList();
    }, [searchParam]);
    const getContractList = () => {
        contractListUrl({
            ...searchParam
        }).then((res) => {
            const {data, state, msg} = res;
            if (state === 1) {
                setContract(data['result']);
                setTotal(data['row_total']);
            } else {
                setContract([]);
                setTotal(0);
                message.error(msg);
            }
            changeLoading(false);
        })
    }
    const queryTable = (values)=>{
        changeLoading(true);
        const {contractCode, contractName} = values;
        setSearchParam({
            ...searchParam,
            'contract_name': contractName,
            'contract_code': contractCode
        });
    }
    const pageNum = (page, pageSize)=>{
        changeLoading(true);
        setSearchParam({
            ...searchParam,
            'page_num': page,
            'page_size': pageSize
        });
    }
    const changeLoading = (flag)=>{
        setLoading(flag);
    }

    const material = (data)=>{

    }

    return (
        <div className="contract">
            <div className="contract-search">
                <Form name="horizontal_login"
                      layout="inline"
                      onFinish={queryTable}>
                    <Form.Item name="contractCode" label="合同编号：">
                        <Input placeholder="请输入合同编号"/>
                    </Form.Item>
                    <Form.Item name="contractName" label="合同名称：">
                        <Input placeholder="请输入合同名称"/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary"
                                icon={<SearchOutlined/>}
                                htmlType="submit">查询</Button>
                    </Form.Item>
                </Form>
            </div>
            <div className="contract-table">
                <Table loading={loading} columns={columns} dataSource={contractData} pagination={false}/>
            </div>
            <div className="contract-page">
                <ConfigProvider locale={zh_CN}>
                    <Pagination current={searchParam.page_num}
                                pageSize={searchParam.page_size}
                                total={total}
                                onChange={pageNum}
                                showSizeChanger
                                showQuickJumper/>
                </ConfigProvider>
            </div>
        </div>
    )
}
export default Contract;
