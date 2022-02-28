import {Button, ConfigProvider, Form, message, Modal, Pagination, Select, Space, Table} from "antd";
import React, {useEffect, useState} from "react";
import zh_CN from "antd/es/locale/zh_CN";
import {columnsOpt} from "./options";
import {paymentListUrl} from 'service/api/payment';
import './index.css';
import {SearchOutlined, PlusOutlined} from "@ant-design/icons";
import AddPayment from './children/addPayment';

function Payment(props) {
    const {title, visible, setVisible, width, code} = props;
    const [columns, setColumns] = useState([
        ...columnsOpt,
        {
            fixed: 'right',
            title: '操作',
            align: 'center',
            render: (text, record) => (
                <Space>
                    <Button size="small">编辑</Button>
                    <Button danger size="small">删除</Button>
                </Space>
            )
        }
    ])
    const [searchParam, setSearchParam] = useState({
        "page_num": 1,
        "page_size": 10,
        "contract_code": code,
        "payment_type": ''
    })
    const [contractData, setContract] = useState([
        {
            "payment_id": "a3bc7055ec5d4fb2beb190cd4837b18b",
            "payment_name": "交流玻璃绝缘子采购合同货到付款",
            "payment_type": 3,
            "amount_money": 170940.18,
            "amount_tax": 29059.82,
            "amount_total": 200000,
            "bank": "中国建设银行股份有限公司厦门吕岭支行",
            "bank_account": "35XXXX1600XXXX50XXXX",
            "invoicer": "广东XXX科技有限公司",
            "invoice_date": 20170609
        }
    ]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [addVisible, setAddVisible] = useState('');
    useEffect(() => {
        // getData();
        changeLoading(false);
    }, [searchParam]);
    const closeModal = (flag) => {
        setVisible(flag);
    }
    const getData = () => {
        paymentListUrl({
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
    const pageNum = (page, pageSize) => {
        changeLoading(true);
        setSearchParam({
            ...searchParam,
            'page_num': page,
            'page_size': pageSize
        });
    }
    const changeLoading = (flag) => {
        setLoading(flag);
    }
    const queryTable = (values)=>{
        changeLoading(true);
        const {paymentType} = values;
        setSearchParam({
            ...searchParam,
            'payment_type': paymentType,
        });
    }
    const handleChange = (values) =>{
        setSearchParam({
            ...searchParam,
            'payment_type': values,
        });
    }
    const showAdd = (flag)=>{
        setAddVisible(flag);
    }
    return (
        <Modal
            visible={visible}
            title={title}
            footer={null}
            wrapClassName="blue-modal"
            bodyStyle={{
                height: "600px",
                overflow: "hidden",
                overflowY: "scroll"
            }}
            keyboard={false}
            maskClosable={false}
            centered={true}
            width={width}
            onCancel={() => closeModal(false)}
            destroyOnClose={true}
        >
            <div className="contract-search">
                <Form name="horizontal_login"
                      layout="inline"
                      onFinish={queryTable}>
                    <Form.Item name="paymentType" label="合同编号：">
                        <Select allowClear
                                value={searchParam.payment_type}
                                style={{ width: 150 }}
                                onChange={handleChange}>
                            <Select.Option value={1}>预付款</Select.Option>
                            <Select.Option value={2}>入成品库款</Select.Option>
                            <Select.Option value={3}>到货款</Select.Option>
                            <Select.Option value={4}>质保金</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Space>
                            <Button type="primary"
                                    icon={<SearchOutlined/>}
                                    htmlType="submit">查询</Button>
                            <Button type="primary"
                                    icon={<PlusOutlined />}
                                    onClick={() => {
                                        showAdd('add')
                                    }}>新增款项</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
            <div className="contract-table">
                <Table loading={loading} scroll={{x: 1300}} columns={columns} dataSource={contractData}
                       pagination={false}/>
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
                addVisible === 'add' && (
                    <AddPayment title={'新增款项'}
                                visible={addVisible}
                                setVisible={setAddVisible}
                                code={code}
                                width={600} />
                )
            }
        </Modal>
    )
}

export default Payment;
