import React, {useEffect, useRef, useState} from "react";
import './index.css';
import {Button, ConfigProvider, Form, Input, message, Pagination, Table, Modal, Space, Drawer, Tooltip} from "antd";
import {SearchOutlined, PlusOutlined, RetweetOutlined, QuestionCircleOutlined} from "@ant-design/icons";
import {columnsOpt} from "./options";
import EditInfo from './components/EditInfo';
import InfoDetail from './components/InfoDetail';
import TwoLevel from './components/TwoLevel';
import {
    cacheListOneUrl,
    refreshListOneUrl,
    deleteCacheListOneUrl
} from 'service/api/cacheManage';
const { confirm } = Modal;

function CacheManage() {
    const tableRef = useRef();
    const [searchParam, setSearchParam] = useState({
        "currentPage": 1,
        "pageSize": 10,
        "orderColumn": '',
        "orderAsc": '',
        "requestPath": ''
    });
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [columns, setColumns] = useState([
        ...columnsOpt,
        {
            fixed: 'right',
            title: '操作',
            align: 'center',
            render: (text, record) => (
                <Space>
                    <Button type='primary' size="small"
                            // onClick={()=>{lookDetail(record)}}
                            onClick={()=>{lookTwoPage(record)}}
                    >详情</Button>
                    <Button type='primary' size="small"
                            disabled={record.status === 0}
                            onClick={()=>{changeStatus(record)}}>刷新缓存</Button>
                    <Button type='primary' size="small"
                            onClick={()=>{editInfo(record)}}>编辑</Button>
                    <Button type='primary' size="small"
                            onClick={()=>{deleteInfo(record)}}>删除</Button>
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
    // 二级页面
    const [visibleTwoPage, setVisibleTwoPage] = useState(false);
    const [requestPath, setRequestPath] = useState('');
    useEffect(() => {
        getCacheList();
    }, [searchParam]);
    const getCacheList = () => {
        cacheListOneUrl({
            ...searchParam
        }).then((res)=>{
            const {data, code, message:msg} = res;
            if (code === 200) {
                setFormData(data['records']);
                setTotal(data['total']);
            } else {
                setFormData([]);
                setTotal(0);
                message.error(msg);
            }
            changeLoading(false);
        })
    }
    const queryTable = (values)=> {
        changeLoading(true);
        const {requestPath} = values;
        setSearchParam({
            ...searchParam,
            'requestPath': requestPath,
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
        refreshListOneUrl({
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
        if (selectedRowKeys.length > 5) {
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
    // 删除信息
    const deleteInfo = (data) => {
        const {id} = data;
        if (!id) {
            message.info('删除信息id不存在！');
        }
        confirm({
            title: '提示',
            content: '您确定要删除此条信息吗？',
            onOk() {
                deleteCacheListOneUrl({
                    id
                }).then((res)=>{
                    const {code} = res;
                    if (code === 200) {
                        message.success('删除成功');
                        getCacheList();
                    } else {
                        message.info("删除失败")
                    }
                })
            },
            onCancel() {
                message.info('取消成功！');
            },
        });
    }
    // 查看二级页面
    const lookTwoPage = (data)=> {
        const {requestPath} = data;
        setRequestPath(requestPath);
        setVisibleTwoPage(true);
    }
    return (
        <div className="contract">
            <div className="contract-search">
                <Form name="horizontal_login"
                      layout="inline"
                      onFinish={queryTable}>
                    <Form.Item name="requestPath" label="请求路径：" style={{
                        marginBottom: '5px'
                    }}>
                        <Input placeholder="请求路径" allowClear/>
                    </Form.Item>
                    <Form.Item>
                        <Space>
                            <Button type="primary"
                                    icon={<SearchOutlined/>}
                                    htmlType="submit">查询</Button>
                            <Button type="primary"
                                    icon={<PlusOutlined />}
                                    onClick={addCacheInfo}
                            >新增</Button>
                            {/*<Button type="primary"
                                    icon={<RetweetOutlined />}
                                    onClick={changeStatuses}
                            >
                                批量刷新缓存
                                <Tooltip placement="topLeft" title="最多选择5条"><QuestionCircleOutlined /></Tooltip>
                            </Button>*/}
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
                        /*rowSelection={{
                            type: 'checkbox',
                            hideSelectAll: true,
                            selectedRowKeys: rowKeys,
                            onChange: (selectedRowKeys, selectedRows)=>{
                                rowSelection(selectedRowKeys, selectedRows);
                            }
                        }}*/
                        tableLayout='auto'
                        rowKey='id'
                        loading={loading}
                        onChange={onChangeTable}
                        columns={columns}
                        dataSource={formData}
                        pagination={false}/>
                </div>
                <div className="contract-table-page">
                    <Pagination current={searchParam.currentPage}
                                pageSize={searchParam.pageSize}
                                total={total}
                                onChange={pageNum}
                                showSizeChanger
                                showQuickJumper/>
                </div>
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
            {
                visibleTwoPage &&
                <TwoLevel visible={visibleTwoPage}
                          requestPath={requestPath}
                          onClose={()=>setVisibleTwoPage(false)}/>
            }

        </div>
    )
}
export default CacheManage;
