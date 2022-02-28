import {Button, DatePicker, Form, Input, message, Modal, Select} from "antd";
import React, {useEffect, useState} from "react";
import {supplierListUrl} from 'service/api/supplier';
import {warehousingOrderListUrl} from 'service/api/warehousingOrder';
import {paymentUpdateUrl} from 'service/api/payment';
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
function AddPayment(props) {
    const {title, visible, setVisible, width, code} = props;
    const closeModal = (flag) => {
        setVisible(flag);
    }
    // 提交参数
    const [payment, setPayment] = useState({
        "operation_type": 'add',
        "contract_code": code,
        "payment": {
            "storage_material_ids": [],
            "entry_ids": [],
            "payment_id": '',
            "payment_name": '',
            "bill_number": '',
            "bill_type": '',
            "amount_money": '',
            "amount_tax": '',
            "amount_total": '',
            "bank": '',
            "bank_account": '',
            "invoicer": '',
            "invoice_date": '',
            "payment_ratio": '',
            "payment_type": ''
        }
    });
    // 入供应商成品库
    const [supplier, setSupplier] = useState([]);
    // 入库单
    const [entry, setEntry] = useState([]);
    useEffect(() => {
        supplierListUrl({
            "page_size": 100,
            "page_num": 1,
            "contract_code": code
        }).then((res) => {
            const {data, state, msg} = res;
            data['result'].push(
                {
                    "storage_id": "47451cae4595428090f0e400aaa28213",
                    "storage_code": "001",
                    "storage_status": 0,
                },
                {
                    "storage_id": "47451cae4595428090f0e400aaa28",
                    "storage_code": "002",
                    "storage_status": 10,
                },
                {
                    "storage_id": "47451cae4595428090f0e400aaa",
                    "storage_code": "003",
                    "storage_status": 10,
                }
            )
            if (state === 1) {
                let arr = data['result'].filter((item) => {
                    return item['storage_status'] === 10
                });
                setSupplier([...arr]);
            } else {
                message.info('请求失败')
            }
        });
        warehousingOrderListUrl({
            "page_size": 100,
            "page_num": 1,
            "contract_code": code
        }).then((res)=>{
            const {data, state, msg} = res;
            data['result'].push(
                {
                    "entry_id": "47451cae4595428090f0e400aaa28213",
                    "entry_code": "001",
                },
                {
                    "entry_id": "47451cae4595428090f0e400aaa28",
                    "entry_code": "002",
                },
                {
                    "entry_id": "47451cae4595428090f0e400aaa",
                    "entry_code": "003",
                }
            )
            if (state === 1) {
                setEntry([...data['result']]);
            } else {
                message.info('请求失败')
            }
        })
    }, []);
    function roundFun(value, n) {
        return Math.round(value*Math.pow(10,n))/Math.pow(10,n);
    }
    const queryTable = (values) => {
        // 格式化日期
        values['invoice_date'] = values['invoice_date'].format('YYYY-MM-DD');
        values['amount_money'] = Math.floor(values['amount_money'] * 100) / 100;
        values['amount_tax'] = Math.floor(values['amount_tax'] * 100) / 100;
        values['amount_total'] = Math.floor(values['amount_total'] * 100) / 100;
        values['payment_ratio'] = Math.floor(values['payment_ratio'] * 100) / 100;

        payment.payment = {
            ...values
        }
        setPayment({
            ...payment
        });
        paymentUpdateUrl(payment).then((res)=>{
            const {data, state, msg} = res;
            if (state === 1) {
                message.success('提交成功');
            } else {
                message.error(msg);
            }
        });
        console.log(payment);
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
                      {...layout}
                      onFinish={queryTable}>
                    <Form.Item name="storage_material_ids" label="入供应商成品库：">
                        <Select
                            mode="multiple"
                            allowClear
                            style={{ width: '100%' }}
                            placeholder="请选择入供应商成品库">
                            {
                                supplier.map((item)=>(
                                    <Select.Option key={item['storage_id']}>{item['storage_code']}</Select.Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item name="entry_ids" label="入库单：">
                        <Select
                            mode="multiple"
                            allowClear
                            style={{ width: '100%' }}
                            placeholder="请选择入库单">
                            {
                                entry.map((item)=>(
                                    <Select.Option key={item['entry_id']}>{item['entry_code']}</Select.Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item name="payment_id"
                               rules={[{ required: true, message: '请输入款项ID' }]}
                               label="款项ID：">
                        <Input placeholder="请输入款项ID" allowClear/>
                    </Form.Item>
                    <Form.Item name="payment_name" label="款项名称：" rules={[{ required: true, message: '请输入款项名称' }]}>
                        <Input placeholder="请输入款项名称" allowClear/>
                    </Form.Item>
                    <Form.Item name="bill_number" label="票据号码：" rules={[{ required: true, message: '请输入票据号码' }]}>
                        <Input placeholder="请输入票据号码" allowClear/>
                    </Form.Item>
                    <Form.Item name="bill_type" label="票据类型：">
                        <Input placeholder="请输入票据类型" allowClear/>
                    </Form.Item>
                    <Form.Item name="amount_money" label="金额：" rules={[{ required: true, message: '请输入金额' }]}>
                        <Input placeholder="请输入金额" allowClear/>
                    </Form.Item>
                    <Form.Item name="amount_tax" label="税额：" rules={[{ required: true, message: '请输入税额' }]}>
                        <Input placeholder="请输入税额" allowClear/>
                    </Form.Item>
                    <Form.Item name="amount_total" label="价税合计：" rules={[{ required: true, message: '请输入价税合计' }]}>
                        <Input placeholder="请输入价税合计" allowClear/>
                    </Form.Item>
                    <Form.Item name="bank" label="开户行：" rules={[{ required: true, message: '请输入开户行' }]}>
                        <Input placeholder="请输入开户行" allowClear/>
                    </Form.Item>
                    <Form.Item name="bank_account" label="开户行账号：">
                        <Input placeholder="请输入开户行账号" allowClear/>
                    </Form.Item>
                    <Form.Item name="invoicer" label="开票单位：" rules={[{ required: true, message: '请输入开票单位' }]}>
                        <Input placeholder="请输入开票单位" allowClear/>
                    </Form.Item>
                    <Form.Item name="invoice_date" label="发票日期：" rules={[{ required: true, message: '请选择发票日期' }]}>
                        <DatePicker placeholder="请选择发票日期" allowClear/>
                    </Form.Item>
                    <Form.Item name="payment_ratio" label="支付比例：" rules={[{ required: true, message: '请输入支付比例' }]}>
                        <Input placeholder="请输入支付比例" />
                    </Form.Item>
                    <Form.Item name="payment_type" label="款项类型：" rules={[{ required: true, message: '请选择款项类型' }]}>
                        <Select allowClear
                            placeholder="请选择款项类型">
                            <Select.Option value={1}>预付款</Select.Option>
                            <Select.Option value={2}>入成品库款</Select.Option>
                            <Select.Option value={3}>到货款</Select.Option>
                            <Select.Option value={4}>质保金</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">提交</Button>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    )
}

export default AddPayment;
