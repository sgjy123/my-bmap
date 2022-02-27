import {Button, ConfigProvider, message, Modal, Pagination, Table} from "antd";
import React, {useEffect, useState} from "react";
import zh_CN from "antd/es/locale/zh_CN";
import {columnsOpt} from "./options";
import {materialPlanUrl} from 'service/api/material';
import './index.css';

function MaterialPlan(props) {
    const {title, visible, setVisible, width, code} = props;
    const [columns, setColumns] = useState([
        ...columnsOpt
    ])
    const [searchParam, setSearchParam] = useState({
        "page_num": 1,
        "page_size": 10,
        "material_id": code
    })
    const [contractData, setContract] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        materialPlanUrl({
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
    },[]);
    const closeModal = (flag) => {
        setVisible(flag);
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

        </Modal>
    )
}

export default MaterialPlan;
