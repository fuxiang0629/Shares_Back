import { Button, Form, Input, Modal, DatePicker } from 'antd';
import React from 'react';

const CreateForm = (props) => {
  const { modalVisible, onCancel, handleAdd } = props;
  if (!modalVisible) return null;

  return (
    <Modal
      destroyOnClose
      title="添加禁止日期"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        layout="horizontal"
        onFinish={handleAdd}
      >
        <Form.Item
          label="起始日期"
          name="BeginDate"
          rules={[
            {
              required: true,
              message: '请选择起始日期!',
            },
          ]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          label="截止日期"
          name="EndDate"
          rules={[
            {
              required: true,
              message: '请选择截止日期!',
            },
          ]}
        >
          <DatePicker />
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

export default CreateForm;
