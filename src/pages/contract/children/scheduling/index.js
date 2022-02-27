import {Button, ConfigProvider, message, Modal, Pagination, Table} from "antd";
import React, {useEffect, useState} from "react";
import zh_CN from "antd/es/locale/zh_CN";
import {columnsOpt} from "./options";
import {schedulingListUrl, confirmSchedulingListUrl} from 'service/api/scheduling';
import './index.css';
const { confirm } = Modal;

function Scheduling(props) {
    const {title, visible, setVisible, width, code} = props;
    const [columns, setColumns] = useState([
        ...columnsOpt,
        {
            title: '确认情况',
            key: 'confirmation_status',
            dataIndex: 'confirmation_status',
            align: 'center',
            ellipsis: true,
            render: (text) => (
                <div>
                    {text === 1 ? '未确认':''}
                    {text === 2 ? '准备完毕':''}
                    {text === 3 ? '已确认':''}
                    {text === 4 ? '被退回':''}
                </div>
            )
        },
        {
            title: '操作',
            align: 'center',
            ellipsis: true,
            render: (text, record) => (
                <div>
                    {
                        record['confirmation_status'] === 1 && (
                            <Button type='primary' style={{'marginRight': '2px'}} onClick={() => {
                                confirmScheduling(record)
                            }}>确认排产资料</Button>
                        )
                    }
                </div>
            )
        }
    ])
    const [searchParam, setSearchParam] = useState({
        "page_num": 1,
        "page_size": 10,
        "contract_code": code
    })
    const [contractData, setContract] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        getData();
    },[]);
    const closeModal = (flag) => {
        setVisible(flag);
    }
    const getData = ()=>{
         schedulingListUrl({
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
    const confirmScheduling = (data)=>{
        confirm({
            title: '确认排产资料',
            content: '您是否确认此操作?',
            onOk() {
                confirmSchedulingListUrl({
                    'confirmation_ids': [data['confirmation_id']]
                }).then((res)=>{
                    if (res.state === 1) {
                        getData();
                    } else {
                        message.error('提交错误！');
                    }
                });
            },
            onCancel() {
                message.info('已取消')
            },
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
            <div className="contract-table">
                <Table loading={loading} scroll={{ x: 1300}} columns={columns} dataSource={contractData} pagination={false}/>
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

export default Scheduling;
