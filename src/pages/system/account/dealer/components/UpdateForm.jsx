import { Button, Form, Input, Modal, Select } from 'antd';
import React, { useRef, useState, useEffect } from 'react';

const UpdateForm = (props) => {
  const { updateModalVisible, onCancel, handleUpdate, values } = props;
  if (!updateModalVisible) return null;

  return (
    <Modal
      destroyOnClose
      title="编辑券商"
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
          label="券商code"
          name="BrokerCode"
          rules={[
            {
              required: true,
              message: '请输入券商code!',
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="券商名称"
          name="BrokerName"
          rules={[
            {
              required: true,
              message: '请输入券商名称!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="版本号"
          name="Version"
          rules={[
            {
              required: true,
              message: '请输入客户端版本号!',
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
