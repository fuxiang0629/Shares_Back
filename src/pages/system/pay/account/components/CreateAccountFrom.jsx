import { Button, Form, Input, Modal, Select } from 'antd';
import React, { useRef, useState, useEffect } from 'react';

const CreateAccountFrom = (props) => {
  const { modalVisible, onCancel, handleAddAccount } = props;
  const [visible, handleVisible] = useState(false);
  if (!modalVisible) return null;

  const handleChangeChannelCode = (value) => {
    if (value === 'Alipay' || value === 'WeChat') {
      handleVisible(true);
    } else {
      handleVisible(false);
    }
  };

  return (
    <Modal
      destroyOnClose
      title="添加支付账号"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
      width={680}
    >
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        layout="horizontal"
        onFinish={handleAddAccount}
      >
        <Form.Item
          label="支付渠道"
          name="ChannelCode"
          rules={[
            {
              required: true,
              message: '请输入支付渠道Code!',
            },
          ]}
        >
          <Select onChange={handleChangeChannelCode}>
            <Select.Option value={`Alipay`}>支付宝</Select.Option>
            <Select.Option value={`WeChat`}>微信</Select.Option>
            <Select.Option value={`Union`}>银联</Select.Option>
            <Select.Option value={`BankCard`}>卡卡</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="账户名称"
          name="Name"
          rules={[
            {
              required: true,
              message: '请输入账户名称!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        {visible && (
          <Form.Item
            label="应用Id"
            name="AppId"
            rules={[
              {
                required: true,
                message: '请输入AppId!',
              },
            ]}
          >
            <Input />
          </Form.Item>
        )}

        {visible && (
          <Form.Item
            label="商户Id"
            name="SellerId"
            rules={[
              {
                required: true,
                message: '请输入SellerId!',
              },
            ]}
          >
            <Input />
          </Form.Item>
        )}

        <Form.Item style={{ justifyContent: 'center' }}>
          <Button type="primary" block htmlType="submit">
            确定
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateAccountFrom;
