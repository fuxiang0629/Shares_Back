import { Button, Form, Input, Modal, Select } from 'antd';
import React from 'react';

const UpdateAccountForm = (props) => {
  const { modalVisible, onCancel, handleUpdatePaymentAccount, values } = props;
  if (!modalVisible) return null;

  return (
    <Modal
      destroyOnClose
      title="编辑支付账号"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
      width={680}
    >
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        layout="horizontal"
        onFinish={handleUpdatePaymentAccount}
        initialValues={{
          ...values,
        }}
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
          <Select disabled={true}>
            <Select.Option value={`Alipay`}>支付宝</Select.Option>
            <Select.Option value={`WeChat`}>微信</Select.Option>
            <Select.Option value={`Union`}>银联</Select.Option>
            <Select.Option value={`BankCard`}>卡卡</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Id" name="Id" hidden={true}>
          <Input />
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

        <Form.Item style={{ justifyContent: 'center' }}>
          <Button type="primary" block htmlType="submit">
            确定
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateAccountForm;
