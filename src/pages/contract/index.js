import React, {useEffect, useState} from "react";
import {Button, ConfigProvider, Form, Input, message, Pagination, Table} from 'antd';
import zh_CN from 'antd/es/locale/zh_CN';
import {SearchOutlined} from '@ant-design/icons';
import './index.css';
import {contractListUrl} from 'service/api/contract';
import {columnsOpt} from './options';
import Material from './children/material';
import Scheduling from './children/scheduling';
import Plan from './children/plan';
import Supplier from './children/supplier';
import Distribution from './children/distribution';
import WarehousingOrder from './children/warehousingOrder';
import Payment from './children/payment';

function Contract() {
    const [visible, setVisible] = useState(false);
    const [schedulingVisible, setSchedulingVisible] = useState(false);
    const [planVisible, setPlanVisible] = useState(false);
    const [supplierVisible, setSupplierVisible] = useState(false);
    const [distributionVisible, setDistributionVisible] = useState(false);
    const [warehousingOrderVisible, setWarehousingOrderVisible] = useState(false);
    const [paymentVisible, setPaymentVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [code, setCode] = useState(null);
    const [columns, setColumns] = useState([
        ...columnsOpt,
        {
            fixed: 'right',
            title: '操作',
            align: 'center',
            width: 500,
            render: (text, record) => (
                <div>
                    <Button type='primary' size="small" style={{'marginRight': '2px','marginBottom': '2px'}} onClick={() => {
                        material(record)
                    }}>物资</Button>
                    <Button type='primary' size="small" style={{'marginRight': '2px','marginBottom': '2px'}} onClick={() => {
                        scheduling(record)
                    }}>排产资料</Button>
                    <Button type='primary' size="small" style={{'marginRight': '2px','marginBottom': '2px'}} onClick={() => {
                        schedulingPlan(record)
                    }}>排产计划</Button>
                    <Button type='primary' size="small" style={{'marginRight': '2px','marginBottom': '2px'}} onClick={() => {
                        supplier(record)
                    }}>成品库</Button>
                    <Button type='primary' size="small" style={{'marginRight': '2px','marginBottom': '2px'}} onClick={() => {
                        distribution(record)
                    }}>配送单</Button>
                    <Button type='primary' size="small" style={{'marginRight': '2px','marginBottom': '2px'}} onClick={() => {
                        warehousingOrder(record)
                    }}>入库单</Button>
                    <Button type='primary' size="small" style={{'marginRight': '2px','marginBottom': '2px'}} onClick={() => {
                        payment(record)
                    }}>款项</Button>
                </div>
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
        setCode(data['contract_code']);
        setTitle('物资明细');
        setVisible(true);
    }

    const scheduling = (data)=>{
        setCode(data['contract_code']);
        setTitle('排产资料');
        setSchedulingVisible(true);
    }

    const schedulingPlan = (data)=>{
        setCode(data['contract_code']);
        setTitle('排产计划');
        setPlanVisible(true);
    }

    const supplier = (data)=>{
        setCode(data['contract_code']);
        setTitle('供应商成品库');
        setSupplierVisible(true);
    }

    const distribution = (data)=>{
        setCode(data['contract_code']);
        setTitle('合同配送单');
        setDistributionVisible(true);
    }

    const warehousingOrder = (data)=>{
        setCode(data['contract_code']);
        setTitle('合同入库单');
        setWarehousingOrderVisible(true);
    }

    const payment = (data)=>{
        setCode(data['contract_code']);
        setTitle('合同款项');
        setPaymentVisible(true);
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
            {
                visible && (
                    <Material title={title}
                              visible={visible}
                              setVisible={setVisible}
                              code={code}
                              width={1500}/>
                )
            }
            {
                schedulingVisible && (
                    <Scheduling title={title}
                              visible={schedulingVisible}
                              setVisible={setSchedulingVisible}
                              code={code}
                              width={1500}/>
                )
            }
            {
                planVisible && (
                    <Plan title={title}
                                visible={planVisible}
                                setVisible={setPlanVisible}
                                code={code}
                                width={1500}/>
                )
            }
            {
                supplierVisible && (
                    <Supplier title={title}
                          visible={supplierVisible}
                          setVisible={setSupplierVisible}
                          code={code}
                          width={1500}/>
                )
            }
            {
                distributionVisible && (
                    <Distribution title={title}
                              visible={distributionVisible}
                              setVisible={setDistributionVisible}
                              code={code}
                              width={1500}/>
                )
            }
            {
                warehousingOrderVisible && (
                    <WarehousingOrder title={title}
                                  visible={warehousingOrderVisible}
                                  setVisible={setWarehousingOrderVisible}
                                  code={code}
                                  width={1500}/>
                )
            }
            {
                paymentVisible && (
                    <Payment title={title}
                                      visible={paymentVisible}
                                      setVisible={setPaymentVisible}
                                      code={code}
                                      width={1500}/>
                )
            }
        </div>
    )
}
export default Contract;
