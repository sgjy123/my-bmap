import React, {useEffect, useState} from "react";
import './index.css';
import {Button, ConfigProvider, Form, Input, message, Pagination, Table} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import zh_CN from "antd/es/locale/zh_CN";
import {columnsOpt} from "./options";
import {
    cacheListUrl
} from 'service/api/cacheManage';

function CacheManage() {
    const [searchParam, setSearchParam] = useState({
        "currentPage": 1,
        "pageSize": 10,
        "orderColumn": '',
        "orderAsc": ''
    });
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [columns, setColumns] = useState([
        ...columnsOpt,
        {
            fixed: 'right',
            title: '操作',
            align: 'center',
            width: 500,
            render: (text, record) => (
                <div>
                    <Button type='primary' size="small" style={{'marginRight': '2px','marginBottom': '2px'}}>更新</Button>
                </div>
            )
        },
    ]);
    const [formData, setFormData] = useState([]);
    useEffect(() => {
        getCacheList();
    }, [searchParam]);
    const getCacheList = () => {
        cacheListUrl({
            ...searchParam
        })
    }
    const queryTable = (values)=> {
        changeLoading(true);
        const {contractCode, contractName} = values;
        setSearchParam({
            ...searchParam,
            'orderColumn': contractName,
            'orderAsc': contractCode
        });
    }
    const pageNum = (page, pageSize)=>{
        changeLoading(true);
        setSearchParam({
            ...searchParam,
            'currentPage': page,
            'pageSize': pageSize
        });
    }
    const changeLoading = (flag)=>{
        setLoading(flag);
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
                <Table loading={loading} columns={columns} dataSource={formData} pagination={false}/>
            </div>
            <div className="contract-page">
                <ConfigProvider locale={zh_CN}>
                    <Pagination current={searchParam.currentPage}
                                pageSize={searchParam.pageSize}
                                total={total}
                                onChange={pageNum}
                                showSizeChanger
                                showQuickJumper/>
                </ConfigProvider>
            </div>
        </div>
    )
}
export default CacheManage;
