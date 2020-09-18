import { Button, Form, Input, Modal, Select } from 'antd';
import React, { useRef, useState, useEffect } from 'react';

const UpdateForm = (props) => {
  const { updateModalVisible, onCancel, handleUpdate, values } = props;
  if (!updateModalVisible) return null;

  return (
    <Modal
      destroyOnClose
      title="编辑券商交易服务器"
      visible={updateModalVisible}
      onCancel={() => onCancel()}
      footer={null}
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
        <Form.Item label="Id" name="Id" hidden={true}>
          <Input />
        </Form.Item>

        <Form.Item
          label="IP"
          name="Ip"
          rules={[
            {
              required: true,
              message: '请输入Ip!',
            },
          ]}
        >
          <Input  />
        </Form.Item>
        <Form.Item
          label="端口号"
          name="Port"
          rules={[
            {
              required: true,
              message: '请输入端口号!',
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

export default UpdateForm;
