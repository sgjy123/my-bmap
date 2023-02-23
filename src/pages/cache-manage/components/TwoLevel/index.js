import PropTypes from "prop-types";
import {Button, Drawer, message, Modal, Pagination, Space, Table, Tooltip} from "antd";
import React, {useEffect, useState} from "react";
import {columnsOpt} from "./options";
import {cacheListTwoUrl, refreshListTwoUrl} from 'service/api/cacheManage';
import {QuestionCircleOutlined, RetweetOutlined} from "@ant-design/icons";
import InfoDetail from "../InfoDetail";

const {confirm} = Modal;
const TwoLevel = (props) => {
    const {visible, onClose, requestPath} = props;
    const [searchParam, setSearchParam] = useState({
        "currentPage": 1,
        "pageSize": 10,
        "orderColumn": '',
        "orderAsc": ''
    });
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [columns, setColumns] = useState([
        {
            title: '主键',
            key: 'id',
            dataIndex: 'id',
            align: 'center',
            render: (id) => (
                <div onClick={()=>showDetail(id)} style={{
                    color: '#1890ff',
                    cursor: 'pointer',
                }}>{id}</div>
            ),
        },
        ...columnsOpt,
        {
            fixed: 'right',
            title: '操作',
            align: 'center',
            render: (text, record) => (
                <Space>
                    <Button type='primary'
                            size="small"
                            disabled={record.cacheStatus === '无效'}
                            onClick={() => {
                                changeStatus(record)
                            }}>刷新缓存</Button>
                </Space>
            )
        },
    ]);
    const [formData, setFormData] = useState([]);
    // 选中ID
    const [rowKeys, setRowKeys] = useState([]);
    const [visibleDetail, setVisibleDetail] = useState(false);
    const [infoId, setInfoId] = useState('');
    useEffect(()=>{
        getCacheTwoLevelList();
    },[searchParam]);
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
    // 刷新缓存
    const refresh = (id) => {
        refreshListTwoUrl({
            ids: Array.isArray(id) ? id : [id]
        }).then((res) => {
            const {code} = res;
            if (code === 200) {
                // 重置选中行
                if (Array.isArray(id)) {
                    setRowKeys([]);
                }
                // 刷新列表
                getCacheTwoLevelList();
                message.success('刷新缓存成功！');
            } else {
                message.error('刷新缓存失败！');
            }
        });
    };
    const changeLoading = (flag) => {
        setLoading(flag);
    }
    const getCacheTwoLevelList = () => {
        cacheListTwoUrl({
            ...searchParam,
            requestPath
        }).then((res) => {
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
    const rowSelection = (selectedRowKeys, selectedRows) => {
        if (selectedRowKeys.length > 5) {
            message.info('最多选择5个！');
            selectedRowKeys.pop();
        }
        ;
        setRowKeys(selectedRowKeys);
    }
    const onChangeTable = (pagination, filters, sorter, extra) => {
        changeLoading(true);
        const {field, order} = sorter;
        setSearchParam({
            ...searchParam,
            'orderColumn': field,
            'orderAsc': order === 'ascend' ? true : ''
        });
    }
    const pageNum = (page, pageSize) => {
        changeLoading(true);
        setSearchParam({
            ...searchParam,
            'currentPage': page,
            'pageSize': pageSize,
        });
    }
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
    const showDetail = (id)=> {
        setVisibleDetail(true);
        setInfoId(id);
    }
    return (
        <Modal title="详情"
               visible={visible}
               onCancel={onClose}
               width={1200}
               bodyStyle={{
                   height: '700px',
                   padding: '12px'
               }}
               footer={null}
        >
            <div style={{
                paddingBottom: '5px'
            }}>
                <Button type="primary"
                        icon={<RetweetOutlined />}
                        onClick={changeStatuses}
                >
                    批量刷新缓存
                    <Tooltip placement="topLeft" title="最多选择5条"><QuestionCircleOutlined /></Tooltip>
                </Button>
            </div>
            <Table
                scroll={{
                    x: 1000,
                    y: 530
                }}
                sticky
                rowSelection={{
                    type: 'checkbox',
                    hideSelectAll: true,
                    selectedRowKeys: rowKeys,
                    onChange: (selectedRowKeys, selectedRows) => {
                        rowSelection(selectedRowKeys, selectedRows);
                    }
                }}
                rowKey='id'
                loading={loading}
                onChange={onChangeTable}
                columns={columns}
                dataSource={formData}
                pagination={false}/>
            <div style={{
                paddingTop: '15px'
            }}>
                <Pagination current={searchParam.currentPage}
                            pageSize={searchParam.pageSize}
                            total={total}
                            onChange={pageNum}
                            showSizeChanger
                            showQuickJumper/>
            </div>
            <Drawer
                title="详细信息"
                visible={visibleDetail}
                onClose={() => {
                    setVisibleDetail(false);
                }}
                width='478px'
                placement="right">
                {
                    visibleDetail && <InfoDetail setVisibleDetail={setVisibleDetail} visibleDetail={visibleDetail} infoId={infoId} />
                }
            </Drawer>
        </Modal>
    )
}
TwoLevel.propTypes = {
    visible: PropTypes.bool, // 关闭抽屉方法
    onClose: PropTypes.func, // 隐藏自己的方法
    requestPath: PropTypes.string.isRequired, // 路径
};
export default TwoLevel;
