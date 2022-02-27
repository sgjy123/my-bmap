import {Button, ConfigProvider, message, Modal, Pagination, Table} from "antd";
import React, {useEffect, useState} from "react";
import zh_CN from "antd/es/locale/zh_CN";
import {columnsOpt} from "./options";
import {distributionListUrl} from 'service/api/distribution';
import './index.css';
import Warehousing from './children/warehousing';
import Enclosure from './children/enclosure';

function Distribution(props) {
    const {title, visible, setVisible, width, code} = props;
    const [columns, setColumns] = useState([
        ...columnsOpt,
        {
            title: '配送物资清单列表',
            key: 'distribution_material',
            dataIndex: 'distribution_material',
            align: 'center',
            ellipsis: true,
            render: (text) => (
                <Button type="link" onClick={()=>{lookStorage(text)}}>查看</Button>
            )
        },
        {
            title: '交接单扫描件附件',
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
            "distribution_id": "cb72369094cc4781b370455ff3ed3058",
            "distribution_code": "0XXXRNXXXX1000XX",
            "distribution_type": "",
            "generation_time": 20161008,
            "distribution_status": 0,
            "receiver": "曾XX",
            "receiver_number": "8126XXXX",
            "receiver_address": "广东省XX市XX区XX大道南XXX号",
            "sender": "许XX",
            "sender_number": "136XXXXXXXX",
            "sender_address": "湖南省XX市XX区XX大道南XXX号",
            "carrier": "XX集团股份有限公司",
            "vehicle_type": "XX快递",
            "vehicle_number": "XAXX0XX",
            "vehicle_status": "良好",
            "driver_number": "137XXXXXXXX",
            "driver_name": "赖XX",
            "loader_num": 2,
            "departure": "7",
            "send_time": 20161020,
            "arrival_time": 20161101,
            "remarks": "",
            "distribution_material": [{
                "material_id": "47451cae4595428090f0e400aaa28213",
                "project_name": "XXXXX所新建XXX线717XXXX#5XXXX区工程",
                "project_code": "0316030001201603180101501444",
                "material_type": "",
                "material_name": "10kV SBH15油浸式变压器，500kVA",
                "specification": "SH15-500kVA",
                "distribution_quantity": 1,
                "unit": "台"
            }]
        }
    ]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [planVisible, setPlanVisible] = useState(false);
    const [enclosureVisible, setEnclosureVisible] = useState(false);
    const [planTitle, setPlanTitle] = useState('');
    const [warehousing,setWarehousing] = useState([]);
    const [enclosure,setEnclosure] = useState([]);
    useEffect(() => {
        /*distributionListUrl({
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
        })*/
        changeLoading(false);
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
        setPlanTitle('配送物资清单列表');
        setPlanVisible(true);
    }
    const lookEnclosure = (data) => {
        if (data) {
            setEnclosure(data);
            setPlanTitle('交接单扫描件附件');
            setEnclosureVisible(true);
        }
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
        </Modal>
    )
}

export default Distribution;
