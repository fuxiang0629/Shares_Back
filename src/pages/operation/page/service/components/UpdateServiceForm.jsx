import { Button, Form, Input, Modal, Select } from 'antd';
import React from 'react';

const UpdateServiceForm = (props) => {
  const { modalVisible, handleUpdateServiceConfig,onCancel,values } = props;
  return (
    <Modal
      destroyOnClose
      title="编辑客服配置"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
      width={600}
    >
      <Form labelCol={{ span: 4 }} wrapperCol={{ span: 18 }} layout="horizontal"
      initialValues={{
        ...values,
      }}
      onFinish={handleUpdateServiceConfig}
      >
        

          <Form.Item
          label="Id"
          name="Id"
          hidden={true}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="页面Code"
          name="PageCode"
          rules={[
            {
              required: true,
              message: '请输入页面code!',
            },
          ]}
          hasFeedback
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="页面名称"
          name="PageName"
          hasFeedback
          rules={[
            {
              required: true,
              message: '请输入页面名称！',
            }
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

export default UpdateServiceForm;
