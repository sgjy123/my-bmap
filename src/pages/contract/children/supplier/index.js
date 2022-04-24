import {Button, ConfigProvider, message, Modal, Pagination, Space, Table} from "antd";
import React, {useEffect, useState} from "react";
import zh_CN from "antd/es/locale/zh_CN";
import {columnsOpt} from "./options";
import {supplierListUrl} from 'service/api/supplier';
import './index.css';
import Warehousing from './children/warehousing';
import Enclosure from './children/enclosure';
import {PlusOutlined} from "@ant-design/icons";
import AddPayment from "../payment/children/addPayment";

function Supplier(props) {
    const {title, visible, setVisible, width, code} = props;
    const [columns, setColumns] = useState([
        ...columnsOpt,
        {
            title: '入库物资信息列表',
            key: 'storage_material',
            dataIndex: 'storage_material',
            align: 'center',
            ellipsis: true,
            render: (text) => (
                <Button type="link" onClick={()=>{lookStorage(text)}}>查看</Button>
            )
        },
        {
            title: '入成品库单据附件',
            key: 'attachmentList',
            dataIndex: 'attachmentList',
            align: 'center',
            ellipsis: true,
            render: (text) => (
                <Button type="link" onClick={()=>{lookEnclosure(text)}}>
                    {text && ('查看')}
                </Button>
            )
        },
    ])
    const [searchParam, setSearchParam] = useState({
        "page_num": 1,
        "page_size": 10,
        "contract_code": code
    })
    const [contractData, setContract] = useState([
        {
            "storage_id": "47451cae4595428090f0e400aaa28213",
            "storage_code": "001",
            "storage_time": 20190712095149,
            "storage_status": 0,
            "remarks": "无",
            "storage_material": [{
                "material_id": "47451cae4595428090f0e400aaa28213",
                "material_name": "10kV SBH15油浸式变压器，500kVA",
                "specification": "SH15-500kVA",
                "storage_quantity": 1,
                "unit": "台"
            }],
            'attachmentList': [
                {
                    'file_name': '文件'
                }
            ]
        }
    ]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [planVisible, setPlanVisible] = useState(false);
    const [enclosureVisible, setEnclosureVisible] = useState(false);
    const [planTitle, setPlanTitle] = useState('');
    const [warehousing,setWarehousing] = useState([]);
    const [enclosure,setEnclosure] = useState([]);
    const [addVisible, setAddVisible] = useState('');
    useEffect(() => {
        supplierListUrl({
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
    const lookStorage = (data) => {
        setWarehousing(data);
        setPlanTitle('入库物资信息');
        setPlanVisible(true);
    }
    const lookEnclosure = (data) => {
        if (data) {
            setEnclosure(data);
            setPlanTitle('入成品库单据附件');
            setEnclosureVisible(true);
        }
    }
    const showAdd = (flag) => {
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
            centered={true}
            width={width}
            onCancel={() => closeModal(false)}
            destroyOnClose={true}
        >
            <Button type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => {
                        showAdd('add')
                    }}>新增款项</Button>
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
                planVisible && (<Warehousing title={planTitle}
                                              visible={planVisible}
                                              setVisible={setPlanVisible}
                                              data={warehousing}
                                              width={1200}/>)
            }
            {
                enclosureVisible && (<Enclosure title={planTitle}
                                             visible={enclosureVisible}
                                             setVisible={setEnclosureVisible}
                                             data={enclosure}
                                             width={1200}/>)
            }
            {
                addVisible === 'add' && (
                    <AddPayment title={'新增款项'}
                                visible={addVisible}
                                setVisible={setAddVisible}
                                code={code}
                                width={600}/>
                )
            }
        </Modal>
    )
}

export default Supplier;
