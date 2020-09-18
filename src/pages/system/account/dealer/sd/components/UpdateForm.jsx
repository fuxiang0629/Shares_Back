import { Button, Form, Input, Modal, Select } from 'antd';
import React, { useRef, useState, useEffect } from 'react';

const UpdateForm = (props) => {
  const { updateModalVisible, onCancel, handleUpdate, values } = props;
  if (!updateModalVisible) return null;

  return (
    <Modal
      destroyOnClose
      title="编辑券商营业部"
      visible={updateModalVisible}
      onCancel={() => onCancel()}
      width={600}
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
          label="营业部Code"
          name="DepartmentCode"
          rules={[
            {
              required: true,
              message: '请输入营业部Code!',
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="营业部名称"
          name="DepartmentName"
          rules={[
            {
              required: true,
              message: '请输入营业部名称!',
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
