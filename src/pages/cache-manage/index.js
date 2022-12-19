import React, {useEffect, useState} from "react";
import './index.css';
import {Button, ConfigProvider, Form, Input, message, Pagination, Table, Modal, Space, Drawer} from "antd";
import {SearchOutlined, PlusOutlined, RetweetOutlined} from "@ant-design/icons";
import zh_CN from "antd/es/locale/zh_CN";
import {columnsOpt} from "./options";
import EditInfo from './components/EditInfo';
import {
    cacheListUrl,
    refreshListUrl
} from 'service/api/cacheManage';
const { confirm } = Modal;

function CacheManage() {
    const [searchParam, setSearchParam] = useState({
        "currentPage": 1,
        "pageSize": 10,
        "orderColumn": '',
        "orderAsc": ''
    });
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [columns, setColumns] = useState([
        ...columnsOpt,
        {
            fixed: 'right',
            title: '操作',
            align: 'center',
            width: 500,
            render: (text, record) => (
                <Space>
                    <Button type='primary' size="small"
                            onClick={()=>{changeStatus(record)}}>更新状态</Button>
                    <Button type='primary' size="small"
                            onClick={()=>{editInfo(record)}}>编辑信息</Button>
                </Space>
            )
        },
    ]);
    const [formData, setFormData] = useState([
        {
            cacheKey: "cacheSlowQuery:/evh/org_v6/listOrganizationsByComponent:24,all,27830218,3",
            cacheLatestTime: "2022-12-16T14:20:54",
            cacheTimeout: 660,
            createTime: "2022-12-06T16:39:55",
            id: '1',
            requestMethod: "POST",
            requestParam: "{\"namespaceId\":27830218,\"organizationId\":3,\"componentType\":\"all\",\"appId\":24}",
            requestPath: "/evh/org_v6/listOrganizationsByComponent",
            status: 1,
            updateTime: "2022-12-06T16:39:55",
        },{
            cacheKey: "cacheSlowQuery:/evh/org_v6/listOrganizationsByComponent:24,all,27830218,3",
            cacheLatestTime: "2022-12-16T14:20:54",
            cacheTimeout: 660,
            createTime: "2022-12-06T16:39:55",
            id: '2',
            requestMethod: "POST",
            requestParam: "{\"namespaceId\":27830218,\"organizationId\":3,\"componentType\":\"all\",\"appId\":24}",
            requestPath: "/evh/org_v6/listOrganizationsByComponent",
            status: 1,
            updateTime: "2022-12-06T16:39:55",
        }
    ]);
    const [visible, setVisible] = useState(false);
    // 弹出抽屉title
    const [formTitle, setFormTitle] = useState('');
    // 选中ID
    const [rowKeys, setRowKeys] = useState([]);
    useEffect(() => {
        getCacheList();
    }, [searchParam]);
    const getCacheList = () => {
        cacheListUrl({
            ...searchParam
        }).then((res)=>{
            const {data, code, message} = res;
            if (code === 200) {
                setFormData(data['records']);
                setTotal(data['total']);
            } else {
                setFormData([]);
                setTotal(0);
                message.error(message);
            }
            changeLoading(false);
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
    const changeStatus = (data) => {
        const {id} = data;
        confirm({
            title: '提示',
            content: '您确定要更新这条信息的状态吗？',
            onOk() {
                refresh(id);
            },
            onCancel() {
                message.info('取消成功！');
            },
        });
    };
    const changeStatuses = () =>{
        confirm({
            title: '提示',
            content: '您确定要更新选中的信息的状态吗？',
            onOk() {
                refresh(rowKeys);
            },
            onCancel() {
                message.info('取消成功！');
            },
        });
    }
    const refresh = (id)=>{
        refreshListUrl({
            ids: Array.isArray(id) ? id : [id]
        }).then((res)=>{
            console.log(res);
        });
    };
    const onChangeTable = (pagination, filters, sorter, extra) => {
        changeLoading(true);
        const {field, order} = sorter;
        setSearchParam({
            ...searchParam,
            'orderColumn': field,
            'orderAsc': order === 'ascend' ? true : ''
        });
    }
    // 编辑信息
    const editInfo = () => {
        // 设置抽屉title
        setFormTitle('编辑信息');
        // 显示抽屉
        setVisible(true);
    }
    const rowSelection = (selectedRowKeys, selectedRows)=>{
        if (selectedRowKeys.length > 5) {
            message.info('最多选择5个！');
        };
        setRowKeys(selectedRowKeys);
    }
    return (
        <div className="contract">
            <div className="contract-search">
                <Form name="horizontal_login"
                      layout="inline"
                      onFinish={queryTable}>
                    {/*<Form.Item name="contractCode" label="合同编号：">
                        <Input placeholder="请输入合同编号"/>
                    </Form.Item>
                    <Form.Item name="contractName" label="合同名称：">
                        <Input placeholder="请输入合同名称"/>
                    </Form.Item>*/}
                    <Form.Item>
                        {/*<Button type="primary"
                                icon={<SearchOutlined/>}
                                htmlType="submit">查询</Button>*/}
                        <Space>
                            <Button type="primary"
                                    icon={<PlusOutlined />}
                            >新增</Button>
                            <Button type="primary"
                                    icon={<RetweetOutlined />}
                                    onClick={changeStatuses}
                            >更新状态</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
            <div className="contract-table">
                <Table
                    rowSelection={{
                        type: 'checkbox',
                        hideSelectAll: true,
                        selectedRowKeys: rowKeys,
                        onChange: (selectedRowKeys, selectedRows)=>{
                            rowSelection(selectedRowKeys, selectedRows);
                        }
                    }}
                    rowKey='id'
                    loading={loading}
                    onChange={onChangeTable}
                    columns={columns}
                    dataSource={formData}
                    pagination={false}/>
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
            {/*抽屉*/}
            <Drawer
                title={formTitle}
                visible={visible}
                onClose={() => setVisible(false)}
                width='478px'
                placement="right">
                {
                    visible && (
                        /*表单组件*/
                        <EditInfo />
                    )
                }

            </Drawer>
        </div>
    )
}
export default CacheManage;
