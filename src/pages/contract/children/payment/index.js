import {Button, ConfigProvider, Form, Input, message, Modal, Pagination, Select, Table} from "antd";
import React, {useEffect, useState} from "react";
import zh_CN from "antd/es/locale/zh_CN";
import {columnsOpt} from "./options";
import {paymentListUrl} from 'service/api/payment';
import './index.css';
import {SearchOutlined} from "@ant-design/icons";

function Payment(props) {
    const {title, visible, setVisible, width, code} = props;
    const [columns, setColumns] = useState([
        ...columnsOpt,
    ])
    const [searchParam, setSearchParam] = useState({
        "page_num": 1,
        "page_size": 10,
        "contract_code": code,
        "payment_type": ''
    })
    const [contractData, setContract] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getData();
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
                                defaultValue={searchParam.payment_type}
                                style={{ width: 150 }}
                                onChange={handleChange}>
                            <Select.Option value={1}>预付款</Select.Option>
                            <Select.Option value={2}>入成品库款</Select.Option>
                            <Select.Option value={3}>到货款</Select.Option>
                            <Select.Option value={4}>质保金</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary"
                                icon={<SearchOutlined/>}
                                htmlType="submit">查询</Button>
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
        </Modal>
    )
}

export default Payment;
