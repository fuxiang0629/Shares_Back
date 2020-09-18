import { Button, Form, Input, Modal } from 'antd';
import React from 'react';

const UpdateWalletForm = (props) => {
  const { modalVisible, handleUpdateWallet, onCancel, values } = props;
  if (!modalVisible) return null;
  return (
    <Modal
      destroyOnClose
      title="修改账户余额"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
      width={600}
    >
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        layout="horizontal"
        initialValues={{
          ...values,
          Deposit: values.Deposit / 10000,
        }}
        onFinish={handleUpdateWallet}
      >
        <Form.Item label="AccountId" name="AccountId" hidden={true}>
          <Input />
        </Form.Item>

        <Form.Item label="当前余额(元)" name="Deposit">
          <Input disabled={true} />
        </Form.Item>

        <Form.Item
          label="增加金额(元)"
          name="AddDeposit"
          rules={[
            {
              required: true,
              message: '请输入增加金额!',
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

export default UpdateWalletForm;
