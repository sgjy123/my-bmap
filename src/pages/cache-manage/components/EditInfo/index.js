import { Button, Form, Input, message, Select, Space, Switch } from 'antd';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
const { TextArea } = Input;
const EditInfo = (props) => {
    return (
        <Form
            /*form={form}
            onFinish={onFinish}
            initialValues={formData}*/
            labelCol={{
                span: 8,
            }}>
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
                label="接口请求参数"
                name="requestParam"
                rules={[
                    {
                        required: true,
                        message: '请输入接口请求参数！',
                    },
                ]}
                extra="必须是json格式"
            >
                <TextArea placeholder="请输入接口请求参数" allowClear/>
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
                extra="必须是json格式"
            >

            </Form.Item>
            <Form.Item wrapperCol={{
                offset: 8,
                span: 16,
            }}>
                {/*<Space>
                    {
                        showAdd && (
                            <Button type="default" htmlType="button" onClick={() => {
                                onReset();
                            }}>重置</Button>
                        )
                    }
                    <Button type="primary" htmlType="submit" loading={loading}>提交</Button>
                </Space>*/}
            </Form.Item>
        </Form>
    );
};
EditInfo.propTypes = {
    formData: PropTypes.object, // 表单数据，只有在编辑是才有，新增为空对象
    setVisible: PropTypes.func, // 关闭抽屉方法
};
export default EditInfo;
