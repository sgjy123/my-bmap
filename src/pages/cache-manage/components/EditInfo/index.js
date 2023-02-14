import {Button, Form, Input, InputNumber, message, Select, Space, Switch} from 'antd';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
    saveCacheListOneUrl
} from 'service/api/cacheManage';
const { TextArea } = Input;
const EditInfo = (props) => {
    const {formData = {}, getCacheList, setVisible, setVisibleEdit} = props;
    const [loading, setLoading] = useState(false);
    // 表单对象
    const [form] = Form.useForm();
    const onFinish = (values) => {
        const {id, cacheTimeout, requestMethod, requestPath, status = false} = values;
        saveCacheListOneUrl({
            id,
            cacheTimeout,
            requestMethod,
            requestPath,
            status: status ? 1 : 0
        }).then((res)=>{
            const {code, errorDesc, data} = res;
            if (code === 200) {
                getCacheList();
                setVisible(false);
                setVisibleEdit(false);
                message.success('成功');
            } else {
                message.error(errorDesc);
            }
        });
    }
    const isValidJSON = (string) => {
        try {
            JSON.stringify(string);
        } catch (e) {
            return false;
        }
        return true;
    }
    function isJSON(str) {
        if (typeof str == 'string') {
            try {
                const obj = JSON.parse(str);
                if(typeof obj == 'object' && obj ){
                    return true;
                }else{
                    return false;
                }
            } catch(e) {
                return false;
            }
        }
    }
    return (
        <Form
            form={form}
            onFinish={onFinish}
            initialValues={formData}
            labelCol={{
                span: 8,
            }}>
            <Form.Item name="id" noStyle
            >
                <Input disabled style={{display: 'none'}} />
            </Form.Item>
            <Form.Item
                label="接口路径"
                name="requestPath"
                rules={[
                    {
                        required: true,
                        message: '请输入接口路径！',
                    },
                ]}
            >
                <Input placeholder="请输入接口路径" allowClear/>
            </Form.Item>
            <Form.Item
                label="接口请求方式"
                name="requestMethod"
                rules={[
                    {
                        required: true,
                        message: '请选择接口请求方式！',
                    },
                ]}
            >
                <Select
                    allowClear
                    options={[
                        {
                            value: 'GET',
                            label: 'GET',
                        },
                        {
                            value: 'POST',
                            label: 'POST',
                        },
                    ]}
                />
            </Form.Item>
            <Form.Item
                label="有效时间"
                name="cacheTimeout"
                extra="（单位：秒）,0代表缓存无限期"
            >
                <InputNumber min={0} allowClear />
            </Form.Item>
            <Form.Item
                label="状态"
                name="status"
                valuePropName="checked"
            >
                <Switch checkedChildren="开启" unCheckedChildren="关闭" />
            </Form.Item>
            <Form.Item
                label="是否判断用户"
                name="status"
                valuePropName="checked"
            >
                <Switch checkedChildren="是" unCheckedChildren="否" />
            </Form.Item>
            <Form.Item wrapperCol={{
                offset: 8,
                span: 16,
            }}>
                <Space>
                    {/*{
                        showAdd && (
                            <Button type="default" htmlType="button" onClick={() => {
                                onReset();
                            }}>重置</Button>
                        )
                    }*/}
                    <Button type="primary" htmlType="submit" loading={loading}>提交</Button>
                </Space>
            </Form.Item>
        </Form>
    );
};
EditInfo.propTypes = {
    formData: PropTypes.object, // 表单数据，只有在编辑是才有，新增为空对象
    setVisible: PropTypes.func, // 关闭抽屉方法
    setVisibleEdit: PropTypes.func, // 关闭自己的方法
    getCacheList: PropTypes.func, // 更新数据
};
export default EditInfo;
