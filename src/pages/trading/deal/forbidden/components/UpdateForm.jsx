import { Button, Form, Input, Modal, Select } from 'antd';
import React, { useRef, useState, useEffect } from 'react';

const UpdateForm = (props) => {
  const { updateModalVisible, onCancel, handleUpdate, values } = props;
  if (!updateModalVisible) return null;

  console.log(values)
  return (
    <Modal
      destroyOnClose
      title="编辑禁止股票名单"
      visible={updateModalVisible}
      onCancel={() => onCancel()}
      footer={null}
      width={600}
    >
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        layout="horizontal"
        onFinish={handleUpdate}
        initialValues={{
          ...values,
        }}
      >
        <Form.Item
          name="LimitKey"
          label="限制关键字"
          rules={[
            {
              required: true,
              message: '请输入限制关键字!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="限制类型" name="LimitType">
          <Select>
            <Select.Option value={1}>股票代码</Select.Option>
            <Select.Option value={2}>股票名称</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="限制市场代码" name="LimitMarket">
          <Select>
            <Select.Option value={-1}>全部市场</Select.Option>
            <Select.Option value={0}>深圳</Select.Option>
            <Select.Option value={1}>上海</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="禁止类型" name="ForbidType">
          <Select>
            <Select.Option value={1}>禁止买入</Select.Option>
            <Select.Option value={2}>禁止卖出</Select.Option>
            <Select.Option value={3}>禁止交易</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Id" name="Id" hidden={true}>
          <Input />
        </Form.Item>

        <Form.Item style={{ justifyContent: 'center' }}>
          <Button type="primary" block htmlType="submit">
            确定
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateForm;
