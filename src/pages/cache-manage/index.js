import React, {useEffect, useRef, useState} from "react";
import './index.css';
import {Button, ConfigProvider, Form, Input, message, Pagination, Table, Modal, Space, Drawer, Tooltip} from "antd";
import {SearchOutlined, PlusOutlined, RetweetOutlined, QuestionCircleOutlined} from "@ant-design/icons";
import zh_CN from "antd/es/locale/zh_CN";
import {columnsOpt} from "./options";
import EditInfo from './components/EditInfo';
import InfoDetail from './components/InfoDetail';
import {
    cacheListUrl,
    refreshListUrl
} from 'service/api/cacheManage';
const { confirm } = Modal;

function CacheManage() {
    const tableRef = useRef();
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
                            onClick={()=>{lookDetail(record)}}>查看详情</Button>
                    <Button type='primary' size="small"
                            onClick={()=>{changeStatus(record)}}>刷新缓存</Button>
                    <Button type='primary' size="small"
                            onClick={()=>{editInfo(record)}}>编辑信息</Button>
                </Space>
            )
        },
    ]);
    const [formData, setFormData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [visibleEdit, setVisibleEdit] = useState(false);
    const [visibleDetail, setVisibleDetail] = useState(false);
    // 弹出抽屉title
    const [formTitle, setFormTitle] = useState('');
    // 选中ID
    const [rowKeys, setRowKeys] = useState([]);
    // 详细信息
    const [detail, setDetail] = useState({});
    // 编辑行数据
    const [editLineData, setEditLineData] = useState({});
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
        if (rowKeys && rowKeys.length <= 0) {
            message.info('请至少选择一条要操作的数据！');
            return false;
        }
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
            const {code} = res;
            if (code === 200) {
                // 重置选中行
                if (Array.isArray(id)) {
                    setRowKeys([]);
                }
                // 刷新列表
                getCacheList();
                message.success('刷新缓存成功！');
            } else {
                message.error('刷新缓存失败！');
            }
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
    const editInfo = (data) => {
        // 设置抽屉title
        setFormTitle('编辑信息');
        // 显示抽屉
        setVisible(true);
        // 显示抽屉
        setVisibleEdit(true);
        // 设置编辑数据
        setEditLineData(data);
    }
    const rowSelection = (selectedRowKeys, selectedRows)=>{
        if (selectedRowKeys.length > 2) {
            message.info('最多选择5个！');
            selectedRowKeys.pop();
        };
        setRowKeys(selectedRowKeys);
    }
    const lookDetail = (data)=>{
        // 设置抽屉title
        setFormTitle('详情信息');
        // 显示抽屉
        setVisible(true);
        // 显示抽屉
        setVisibleDetail(true);
        // 设置数据
        setDetail(data);
    }
    const addCacheInfo = () => {
        // 设置空数据
        setEditLineData({});
        // 设置抽屉title
        setFormTitle('新增数据');
        // 显示抽屉
        setVisible(true);
        // 显示抽屉
        setVisibleEdit(true);
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
                                    onClick={addCacheInfo}
                            >新增</Button>
                            <Button type="primary"
                                    icon={<RetweetOutlined />}
                                    onClick={changeStatuses}
                            >
                                批量刷新缓存
                                <Tooltip placement="topLeft" title="最多选择5条"><QuestionCircleOutlined /></Tooltip>
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
            <div className="contract-table" ref={tableRef}>
                <div className="contract-table-content">
                    <Table
                        scroll={{
                            x: true
                        }}
                        sticky
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
                onClose={() => {
                    setVisible(false);
                    setVisibleDetail(false);
                    setVisibleEdit(false);
                }}
                width='478px'
                placement="right">
                {
                    (visible && visibleEdit)&& (
                        /*表单组件*/
                        <EditInfo setVisible={setVisible}
                                  setVisibleEdit={setVisibleEdit}
                                  getCacheList={getCacheList}
                                  formData={editLineData} />
                    )
                }
                {
                    (visible && visibleDetail) && (
                        /*详情组件*/
                        <InfoDetail detail={detail}
                                    setVisible={setVisible}
                                    setVisibleDetail={setVisibleDetail} />
                    )
                }
            </Drawer>
        </div>
    )
}
export default CacheManage;
