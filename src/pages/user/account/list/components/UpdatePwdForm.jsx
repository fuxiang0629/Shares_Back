import { Button, Form, Input, Modal, Select } from 'antd';
import React from 'react';

const UpdatePwdForm = (props) => {
  const { modalVisible, handleUpdatePwd, onCancel, values, type } = props;
  if (!modalVisible) return null;
  return (
    <Modal
      destroyOnClose
      title={`修改${!type ? '登录' : '交易'}密码`}
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        layout="horizontal"
        initialValues={{
          ...values,
        }}
        onFinish={handleUpdatePwd}
      >
        <Form.Item label="AccountId" name="AccountId" hidden={true}>
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="密码"
          rules={[
            {
              required: true,
              message: '请输入您的密码!',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="确认密码"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: '请确认您的密码!',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('您输入的两个密码不匹配!');
              },
            }),
          ]}
        >
          <Input.Password />
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

export default UpdatePwdForm;
